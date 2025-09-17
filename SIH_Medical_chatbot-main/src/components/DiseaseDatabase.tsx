import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  AlertTriangle, 
  Shield, 
  Pill, 
  TrendingUp,
  Heart,
  Brain,
  Eye,
  Bone
} from 'lucide-react';

interface Disease {
  id: string;
  name: string;
  category: 'infectious' | 'chronic' | 'mental' | 'genetic' | 'autoimmune';
  severity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  causes: string[];
  riskFactors: string[];
  prevention: string[];
  treatment: string[];
  complications: string[];
  prevalence: string;
  affectedSystems: string[];
  commonAge: string;
  description: string;
  whenToSeekHelp: string[];
}

const DiseaseDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const diseases: Disease[] = [
    {
      id: '1',
      name: 'Hypertension (High Blood Pressure)',
      category: 'chronic',
      severity: 'medium',
      symptoms: ['Usually no symptoms', 'Headaches (severe cases)', 'Dizziness', 'Blurred vision', 'Chest pain'],
      causes: ['Unknown (primary)', 'Kidney disease', 'Adrenal disorders', 'Thyroid problems', 'Blood vessel defects'],
      riskFactors: ['Age', 'Family history', 'Obesity', 'Sedentary lifestyle', 'High sodium intake', 'Smoking', 'Diabetes'],
      prevention: ['Regular exercise', 'Healthy diet (low sodium)', 'Maintain healthy weight', 'Limit alcohol', 'Don\'t smoke', 'Manage stress'],
      treatment: ['Lifestyle changes', 'ACE inhibitors', 'Diuretics', 'Beta-blockers', 'Calcium channel blockers', 'Regular monitoring'],
      complications: ['Heart attack', 'Stroke', 'Heart failure', 'Kidney damage', 'Vision problems'],
      prevalence: 'Affects 1 in 3 adults worldwide',
      affectedSystems: ['Cardiovascular', 'Renal', 'Nervous'],
      commonAge: 'Adults over 30, increases with age',
      description: 'A condition where blood pressure in arteries is persistently elevated, often called the "silent killer" due to lack of symptoms.',
      whenToSeekHelp: ['Blood pressure consistently above 140/90', 'Severe headache', 'Chest pain', 'Difficulty breathing', 'Vision changes']
    },
    {
      id: '2',
      name: 'Type 2 Diabetes',
      category: 'chronic',
      severity: 'high',
      symptoms: ['Increased thirst', 'Frequent urination', 'Increased hunger', 'Fatigue', 'Blurred vision', 'Slow-healing wounds'],
      causes: ['Insulin resistance', 'Insufficient insulin production', 'Genetic factors', 'Lifestyle factors'],
      riskFactors: ['Obesity', 'Age over 45', 'Family history', 'Physical inactivity', 'High blood pressure', 'Abnormal cholesterol'],
      prevention: ['Healthy diet', 'Regular exercise', 'Weight management', 'Limit refined sugars', 'Regular health checkups'],
      treatment: ['Metformin', 'Insulin therapy', 'Lifestyle modifications', 'Blood sugar monitoring', 'Diet management'],
      complications: ['Heart disease', 'Stroke', 'Kidney disease', 'Eye damage', 'Nerve damage', 'Foot problems'],
      prevalence: 'Over 400 million people worldwide',
      affectedSystems: ['Endocrine', 'Cardiovascular', 'Nervous', 'Renal'],
      commonAge: 'Usually develops after age 40, but increasing in younger adults',
      description: 'A chronic condition affecting how the body processes blood sugar (glucose), characterized by insulin resistance.',
      whenToSeekHelp: ['Blood sugar consistently above 126 mg/dL', 'Symptoms of diabetic ketoacidosis', 'Severe dehydration', 'Persistent infections']
    },
    {
      id: '3',
      name: 'Depression',
      category: 'mental',
      severity: 'medium',
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep problems', 'Appetite changes', 'Difficulty concentrating', 'Feelings of worthlessness'],
      causes: ['Genetic factors', 'Brain chemistry imbalance', 'Hormonal changes', 'Trauma', 'Chronic illness', 'Substance abuse'],
      riskFactors: ['Family history', 'Major life changes', 'Chronic illness', 'Personality traits', 'Substance abuse', 'Medications'],
      prevention: ['Regular exercise', 'Healthy sleep habits', 'Social connections', 'Stress management', 'Avoid alcohol/drugs', 'Seek early help'],
      treatment: ['Psychotherapy', 'Antidepressants', 'Cognitive behavioral therapy', 'Lifestyle changes', 'Support groups'],
      complications: ['Suicide risk', 'Substance abuse', 'Relationship problems', 'Work/school difficulties', 'Physical health problems'],
      prevalence: 'Affects over 280 million people worldwide',
      affectedSystems: ['Nervous', 'Endocrine'],
      commonAge: 'Can occur at any age, often begins in teens/early adulthood',
      description: 'A mental health disorder characterized by persistent feelings of sadness and loss of interest in activities.',
      whenToSeekHelp: ['Persistent symptoms for 2+ weeks', 'Thoughts of self-harm', 'Unable to function daily', 'Substance abuse', 'Severe mood changes']
    },
    {
      id: '4',
      name: 'COVID-19',
      category: 'infectious',
      severity: 'medium',
      symptoms: ['Fever', 'Cough', 'Shortness of breath', 'Loss of taste/smell', 'Fatigue', 'Body aches', 'Sore throat'],
      causes: ['SARS-CoV-2 virus infection'],
      riskFactors: ['Age over 65', 'Chronic diseases', 'Immunocompromised', 'Obesity', 'Close contact with infected person'],
      prevention: ['Vaccination', 'Mask wearing', 'Hand hygiene', 'Social distancing', 'Avoid crowds', 'Good ventilation'],
      treatment: ['Rest and fluids', 'Symptom management', 'Antiviral medications (if indicated)', 'Oxygen therapy (severe cases)', 'Hospitalization if needed'],
      complications: ['Pneumonia', 'Acute respiratory distress', 'Multi-organ failure', 'Long COVID', 'Blood clots'],
      prevalence: 'Global pandemic, millions affected worldwide',
      affectedSystems: ['Respiratory', 'Cardiovascular', 'Nervous', 'Immune'],
      commonAge: 'All ages, severe illness more common in older adults',
      description: 'A contagious respiratory illness caused by the SARS-CoV-2 virus, ranging from mild to severe symptoms.',
      whenToSeekHelp: ['Difficulty breathing', 'Chest pain', 'High fever', 'Confusion', 'Severe dehydration', 'Persistent symptoms']
    },
    {
      id: '5',
      name: 'Asthma',
      category: 'chronic',
      severity: 'medium',
      symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing (especially at night)', 'Difficulty speaking'],
      causes: ['Genetic predisposition', 'Environmental factors', 'Allergens', 'Respiratory infections', 'Air pollution'],
      riskFactors: ['Family history', 'Allergies', 'Eczema', 'Obesity', 'Smoking exposure', 'Occupational chemicals'],
      prevention: ['Avoid triggers', 'Control allergies', 'Get vaccinated', 'Maintain healthy weight', 'Avoid smoking', 'Use air purifiers'],
      treatment: ['Quick-relief inhalers', 'Long-term control medications', 'Allergy medications', 'Immunotherapy', 'Action plan'],
      complications: ['Severe asthma attacks', 'Sleep problems', 'Permanent lung changes', 'Side effects from medications'],
      prevalence: 'Affects over 300 million people globally',
      affectedSystems: ['Respiratory'],
      commonAge: 'Often begins in childhood, can develop at any age',
      description: 'A chronic respiratory condition where airways become inflamed and narrowed, making breathing difficult.',
      whenToSeekHelp: ['Severe breathing difficulty', 'No improvement with rescue inhaler', 'Can\'t speak in full sentences', 'Frequent attacks']
    },
    {
      id: '6',
      name: 'Migraine',
      category: 'chronic',
      severity: 'medium',
      symptoms: ['Severe headache', 'Nausea', 'Vomiting', 'Light sensitivity', 'Sound sensitivity', 'Visual aura', 'Dizziness'],
      causes: ['Genetic factors', 'Hormonal changes', 'Stress', 'Sleep changes', 'Weather changes', 'Certain foods', 'Medications'],
      riskFactors: ['Family history', 'Age (20s-50s)', 'Female gender', 'Hormonal changes', 'Stress', 'Sleep disorders'],
      prevention: ['Identify triggers', 'Regular sleep schedule', 'Stress management', 'Regular meals', 'Stay hydrated', 'Limit caffeine'],
      treatment: ['Pain relievers', 'Triptans', 'Preventive medications', 'Lifestyle modifications', 'Rest in dark room'],
      complications: ['Chronic migraine', 'Medication overuse headache', 'Depression', 'Anxiety', 'Sleep disorders'],
      prevalence: 'Affects 1 billion people worldwide',
      affectedSystems: ['Nervous'],
      commonAge: 'Most common in adults 20-50 years old',
      description: 'A neurological condition characterized by recurring severe headaches often accompanied by other symptoms.',
      whenToSeekHelp: ['Sudden severe headache', 'Headache with fever/stiff neck', 'Vision changes', 'Weakness', 'Frequent severe headaches']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: Heart },
    { value: 'infectious', label: 'Infectious', icon: AlertTriangle },
    { value: 'chronic', label: 'Chronic', icon: TrendingUp },
    { value: 'mental', label: 'Mental Health', icon: Brain },
    { value: 'genetic', label: 'Genetic', icon: Bone },
    { value: 'autoimmune', label: 'Autoimmune', icon: Shield }
  ];

  const severityLevels = [
    { value: 'all', label: 'All Severities' },
    { value: 'low', label: 'Low Risk', color: 'bg-secondary text-secondary-foreground' },
    { value: 'medium', label: 'Medium Risk', color: 'bg-accent text-accent-foreground' },
    { value: 'high', label: 'High Risk', color: 'bg-primary text-primary-foreground' },
    { value: 'critical', label: 'Critical', color: 'bg-destructive text-destructive-foreground' }
  ];

  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => {
      const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           disease.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           disease.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'all' || disease.severity === selectedSeverity;
      
      return matchesSearch && matchesCategory && matchesSeverity;
    });
  }, [searchTerm, selectedCategory, selectedSeverity]);

  const getSeverityColor = (severity: string) => {
    const severityLevel = severityLevels.find(s => s.value === severity);
    return severityLevel?.color || 'bg-muted text-muted-foreground';
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.value === category);
    return categoryData?.icon || Heart;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Medical Disease Database</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive information about common diseases, their symptoms, causes, treatments, and prevention strategies. 
          Always consult healthcare professionals for proper diagnosis and treatment.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Search Disease Database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <Input
            placeholder="Search diseases by name, symptoms, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />

          {/* Category Filter */}
          <div>
            <p className="text-sm font-medium mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Severity Filter */}
          <div>
            <p className="text-sm font-medium mb-2">Severity Level</p>
            <div className="flex flex-wrap gap-2">
              {severityLevels.map((severity) => (
                <Button
                  key={severity.value}
                  onClick={() => setSelectedSeverity(severity.value)}
                  variant={selectedSeverity === severity.value ? "default" : "outline"}
                  size="sm"
                >
                  {severity.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {filteredDiseases.length} Disease{filteredDiseases.length !== 1 ? 's' : ''} Found
          </h3>
          <Badge variant="secondary">
            Total: {diseases.length} diseases in database
          </Badge>
        </div>

        {filteredDiseases.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Diseases Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredDiseases.map((disease) => {
              const CategoryIcon = getCategoryIcon(disease.category);
              return (
                <Card key={disease.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                          <CategoryIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{disease.name}</CardTitle>
                          <p className="text-muted-foreground text-sm mt-1">
                            {disease.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="capitalize">
                          {disease.category}
                        </Badge>
                        <Badge className={getSeverityColor(disease.severity)}>
                          {disease.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                        <TabsTrigger value="prevention">Prevention</TabsTrigger>
                        <TabsTrigger value="treatment">Treatment</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-4 mt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                              Common Symptoms
                            </h4>
                            <ul className="space-y-1">
                              {disease.symptoms.slice(0, 4).map((symptom, index) => (
                                <li key={index} className="text-sm flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                                  {symptom}
                                </li>
                              ))}
                              {disease.symptoms.length > 4 && (
                                <li className="text-sm text-muted-foreground">
                                  +{disease.symptoms.length - 4} more symptoms
                                </li>
                              )}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-accent" />
                              Key Information
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div><strong>Prevalence:</strong> {disease.prevalence}</div>
                              <div><strong>Common Age:</strong> {disease.commonAge}</div>
                              <div><strong>Affected Systems:</strong> {disease.affectedSystems.join(', ')}</div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="symptoms" className="mt-4">
                        <h4 className="font-semibold mb-3">All Symptoms</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {disease.symptoms.map((symptom, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                              <AlertTriangle className="h-3 w-3 text-destructive flex-shrink-0" />
                              <span className="text-sm">{symptom}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="prevention" className="mt-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-secondary" />
                          Prevention Strategies
                        </h4>
                        <div className="space-y-2">
                          {disease.prevention.map((prevention, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                              <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{prevention}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="treatment" className="mt-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Pill className="h-4 w-4 text-primary" />
                          Treatment Options
                        </h4>
                        <div className="space-y-2">
                          {disease.treatment.map((treatment, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                              <Pill className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                              <span className="text-sm">{treatment}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="details" className="mt-4 space-y-4">
                        <div className="grid gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Risk Factors</h4>
                            <div className="flex flex-wrap gap-1">
                              {disease.riskFactors.map((factor, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Possible Complications</h4>
                            <ul className="space-y-1">
                              {disease.complications.map((complication, index) => (
                                <li key={index} className="text-sm flex items-center gap-2">
                                  <AlertTriangle className="h-3 w-3 text-destructive flex-shrink-0" />
                                  {complication}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-accent">When to Seek Medical Help</h4>
                            <ul className="space-y-1">
                              {disease.whenToSeekHelp.map((symptom, index) => (
                                <li key={index} className="text-sm flex items-center gap-2">
                                  <AlertTriangle className="h-3 w-3 text-accent flex-shrink-0" />
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Medical Disclaimer */}
      <Card className="border-accent bg-accent/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-accent mb-2">Important Medical Disclaimer</h4>
              <p className="text-sm text-accent-foreground/80">
                This information is for educational purposes only and should not be used as a substitute for professional medical advice, 
                diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions 
                you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because 
                of information obtained from this database.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseaseDatabase;