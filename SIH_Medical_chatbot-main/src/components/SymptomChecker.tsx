import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Brain, 
  Heart, 
  Thermometer,
  Activity,
  Eye,
  Stethoscope,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Symptom {
  id: string;
  name: string;
  category: 'general' | 'respiratory' | 'digestive' | 'neurological' | 'musculoskeletal' | 'cardiovascular';
  severity: 'mild' | 'moderate' | 'severe';
  icon: any;
}

interface PossibleCondition {
  name: string;
  probability: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendedActions: string[];
  urgency: 'routine' | 'soon' | 'urgent' | 'emergency';
}

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<PossibleCondition[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const symptomCategories = {
    general: [
      { id: 'fever', name: 'Fever/High Temperature', category: 'general', severity: 'moderate', icon: Thermometer },
      { id: 'fatigue', name: 'Fatigue/Weakness', category: 'general', severity: 'mild', icon: Activity },
      { id: 'chills', name: 'Chills', category: 'general', severity: 'mild', icon: Thermometer },
      { id: 'sweating', name: 'Excessive Sweating', category: 'general', severity: 'mild', icon: Activity },
      { id: 'weight_loss', name: 'Unexplained Weight Loss', category: 'general', severity: 'moderate', icon: Activity }
    ],
    respiratory: [
      { id: 'cough', name: 'Cough', category: 'respiratory', severity: 'mild', icon: Stethoscope },
      { id: 'shortness_breath', name: 'Shortness of Breath', category: 'respiratory', severity: 'severe', icon: Stethoscope },
      { id: 'chest_pain', name: 'Chest Pain', category: 'respiratory', severity: 'severe', icon: Heart },
      { id: 'wheezing', name: 'Wheezing', category: 'respiratory', severity: 'moderate', icon: Stethoscope },
      { id: 'sore_throat', name: 'Sore Throat', category: 'respiratory', severity: 'mild', icon: Stethoscope }
    ],
    neurological: [
      { id: 'headache', name: 'Headache', category: 'neurological', severity: 'mild', icon: Brain },
      { id: 'dizziness', name: 'Dizziness', category: 'neurological', severity: 'moderate', icon: Brain },
      { id: 'confusion', name: 'Confusion/Memory Issues', category: 'neurological', severity: 'severe', icon: Brain },
      { id: 'vision_problems', name: 'Vision Problems', category: 'neurological', severity: 'moderate', icon: Eye },
      { id: 'numbness', name: 'Numbness/Tingling', category: 'neurological', severity: 'moderate', icon: Brain }
    ],
    digestive: [
      { id: 'nausea', name: 'Nausea/Vomiting', category: 'digestive', severity: 'moderate', icon: Activity },
      { id: 'abdominal_pain', name: 'Abdominal Pain', category: 'digestive', severity: 'moderate', icon: Activity },
      { id: 'diarrhea', name: 'Diarrhea', category: 'digestive', severity: 'mild', icon: Activity },
      { id: 'constipation', name: 'Constipation', category: 'digestive', severity: 'mild', icon: Activity },
      { id: 'loss_appetite', name: 'Loss of Appetite', category: 'digestive', severity: 'mild', icon: Activity }
    ],
    cardiovascular: [
      { id: 'rapid_heartbeat', name: 'Rapid Heartbeat', category: 'cardiovascular', severity: 'moderate', icon: Heart },
      { id: 'chest_pressure', name: 'Chest Pressure', category: 'cardiovascular', severity: 'severe', icon: Heart },
      { id: 'swelling', name: 'Swelling in Legs/Feet', category: 'cardiovascular', severity: 'moderate', icon: Heart },
      { id: 'fainting', name: 'Fainting/Near Fainting', category: 'cardiovascular', severity: 'severe', icon: Heart }
    ],
    musculoskeletal: [
      { id: 'joint_pain', name: 'Joint Pain', category: 'musculoskeletal', severity: 'mild', icon: Activity },
      { id: 'muscle_aches', name: 'Muscle Aches', category: 'musculoskeletal', severity: 'mild', icon: Activity },
      { id: 'back_pain', name: 'Back Pain', category: 'musculoskeletal', severity: 'moderate', icon: Activity },
      { id: 'stiffness', name: 'Stiffness', category: 'musculoskeletal', severity: 'mild', icon: Activity }
    ]
  };

  const allSymptoms = Object.values(symptomCategories).flat();

  const steps = [
    'Select Your Symptoms',
    'Review Selection',
    'Get Analysis'
  ];

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please select at least one symptom to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(2);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis logic based on selected symptoms
    const conditions: PossibleCondition[] = [];
    
    // Check for respiratory conditions
    const respiratorySymptoms = selectedSymptoms.filter(id => 
      ['cough', 'shortness_breath', 'chest_pain', 'wheezing', 'sore_throat'].includes(id)
    );
    
    if (respiratorySymptoms.length >= 2) {
      conditions.push({
        name: 'Upper Respiratory Infection',
        probability: 75,
        severity: 'medium',
        description: 'Common viral or bacterial infection affecting the upper respiratory tract.',
        recommendedActions: [
          'Rest and stay hydrated',
          'Use humidifier or steam inhalation',
          'Consider over-the-counter medications for symptom relief',
          'Consult healthcare provider if symptoms persist or worsen'
        ],
        urgency: 'routine'
      });
    }

    // Check for cardiovascular symptoms
    const cardiacSymptoms = selectedSymptoms.filter(id => 
      ['chest_pain', 'chest_pressure', 'shortness_breath', 'rapid_heartbeat', 'fainting'].includes(id)
    );
    
    if (cardiacSymptoms.length >= 2) {
      conditions.push({
        name: 'Cardiac-Related Symptoms',
        probability: 60,
        severity: 'high',
        description: 'Symptoms that may indicate cardiovascular issues requiring medical attention.',
        recommendedActions: [
          'Seek immediate medical attention if severe',
          'Monitor symptoms closely',
          'Avoid strenuous activity',
          'Call emergency services if chest pain is severe'
        ],
        urgency: 'urgent'
      });
    }

    // Check for general infection
    if (selectedSymptoms.includes('fever') && selectedSymptoms.length >= 3) {
      conditions.push({
        name: 'Viral Infection',
        probability: 80,
        severity: 'medium',
        description: 'Common viral illness with multiple systemic symptoms.',
        recommendedActions: [
          'Get plenty of rest',
          'Stay hydrated with fluids',
          'Monitor temperature regularly',
          'Seek medical care if fever persists over 3 days'
        ],
        urgency: 'routine'
      });
    }

    // Check for neurological symptoms
    const neuroSymptoms = selectedSymptoms.filter(id => 
      ['headache', 'dizziness', 'confusion', 'vision_problems', 'numbness'].includes(id)
    );
    
    if (neuroSymptoms.length >= 2) {
      conditions.push({
        name: 'Neurological Symptoms',
        probability: 65,
        severity: 'medium',
        description: 'Symptoms affecting the nervous system that may require evaluation.',
        recommendedActions: [
          'Track symptom patterns and triggers',
          'Ensure adequate rest and hydration',
          'Avoid driving if experiencing dizziness',
          'Consult healthcare provider for proper evaluation'
        ],
        urgency: 'soon'
      });
    }

    // Default condition if no specific pattern
    if (conditions.length === 0) {
      conditions.push({
        name: 'General Health Concern',
        probability: 50,
        severity: 'low',
        description: 'Your symptoms may indicate a minor health issue or normal variation.',
        recommendedActions: [
          'Monitor symptoms for changes',
          'Maintain good self-care practices',
          'Consider lifestyle factors that might contribute',
          'Consult healthcare provider if symptoms persist or worsen'
        ],
        urgency: 'routine'
      });
    }

    // Sort by probability
    conditions.sort((a, b) => b.probability - a.probability);

    setAnalysisResults(conditions);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setCurrentStep(0);
    setAnalysisResults([]);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-secondary text-secondary-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'high': return 'bg-primary text-primary-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'routine': return 'text-secondary';
      case 'soon': return 'text-accent';
      case 'urgent': return 'text-primary';
      case 'emergency': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                Symptom Analysis Complete
              </CardTitle>
              <Button onClick={resetChecker} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Based on your selected symptoms: {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedSymptoms.map(symptomId => {
                  const symptom = allSymptoms.find(s => s.id === symptomId);
                  return symptom ? (
                    <Badge key={symptomId} variant="outline" className="text-xs">
                      {symptom.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Possible Conditions</h3>
          {analysisResults.map((condition, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{condition.name}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{condition.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={condition.probability} className="w-20 h-2" />
                      <span className="text-sm font-medium">{condition.probability}%</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getSeverityColor(condition.severity)}>
                        {condition.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getUrgencyColor(condition.urgency)}>
                        {condition.urgency.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Recommended Actions:</h5>
                  <ul className="space-y-1">
                    {condition.recommendedActions.map((action, actionIndex) => (
                      <li key={actionIndex} className="text-sm flex items-start gap-2">
                        <ArrowRight className="h-3 w-3 mt-1 flex-shrink-0 text-primary" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-destructive bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-destructive mb-2">Important Disclaimer</h4>
                <p className="text-sm text-destructive-foreground/80">
                  This symptom checker is for informational purposes only and should not replace professional medical advice. 
                  If you have severe symptoms, are experiencing a medical emergency, or have concerns about your health, 
                  please contact a healthcare provider immediately or call emergency services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            AI Symptom Checker
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Select your symptoms to get personalized health guidance
            </p>
            <Badge variant="secondary">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{step}</span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 0 && (
        <div className="space-y-6">
          {Object.entries(symptomCategories).map(([categoryName, symptoms]) => (
            <Card key={categoryName} className="shadow-md">
              <CardHeader>
                <CardTitle className="capitalize text-lg">
                  {categoryName.replace('_', ' ')} Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {symptoms.map((symptom) => {
                    const Icon = symptom.icon;
                    const isSelected = selectedSymptoms.includes(symptom.id);
                    return (
                      <div
                        key={symptom.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => toggleSymptom(symptom.id)}
                      >
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => toggleSymptom(symptom.id)}
                        />
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <span className="text-sm font-medium">{symptom.name}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            symptom.severity === 'severe' ? 'border-destructive text-destructive' :
                            symptom.severity === 'moderate' ? 'border-accent text-accent' :
                            'border-secondary text-secondary'
                          }`}
                        >
                          {symptom.severity}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <Button 
              onClick={() => setCurrentStep(1)}
              disabled={selectedSymptoms.length === 0}
              className="flex items-center gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Review Your Symptoms</CardTitle>
              <p className="text-muted-foreground">
                Please review your selected symptoms before analysis
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedSymptoms.map(symptomId => {
                  const symptom = allSymptoms.find(s => s.id === symptomId);
                  if (!symptom) return null;
                  const Icon = symptom.icon;
                  return (
                    <div key={symptomId} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{symptom.name}</span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {symptom.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => toggleSymptom(symptom.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              onClick={() => setCurrentStep(0)}
              variant="outline"
            >
              Back
            </Button>
            <Button 
              onClick={analyzeSymptoms}
              className="flex items-center gap-2"
            >
              Analyze Symptoms
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && isAnalyzing && (
        <Card className="shadow-md">
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Your Symptoms</h3>
            <p className="text-muted-foreground">
              Our AI is processing your symptoms and generating personalized recommendations...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomChecker;