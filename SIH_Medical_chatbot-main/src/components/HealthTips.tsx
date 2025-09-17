import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Brain, 
  Shield, 
  Apple, 
  Moon, 
  Dumbbell,
  Droplets,
  Wind,
  Sun,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Clock,
  Target
} from 'lucide-react';

interface HealthTip {
  id: string;
  title: string;
  category: 'nutrition' | 'exercise' | 'mental' | 'prevention' | 'sleep' | 'general';
  description: string;
  benefits: string[];
  howTo: string[];
  frequency: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  icon: any;
}

const HealthTips = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const healthTips: HealthTip[] = [
    {
      id: '1',
      title: 'Stay Hydrated Daily',
      category: 'general',
      description: 'Proper hydration is essential for all bodily functions, including temperature regulation, joint lubrication, and nutrient transport.',
      benefits: [
        'Improved energy levels',
        'Better skin health',
        'Enhanced cognitive function',
        'Optimal kidney function',
        'Better digestion'
      ],
      howTo: [
        'Drink 8-10 glasses of water daily',
        'Start your day with a glass of water',
        'Carry a water bottle with you',
        'Eat water-rich foods like fruits and vegetables',
        'Monitor urine color (should be pale yellow)'
      ],
      frequency: 'Throughout the day',
      difficulty: 'easy',
      icon: Droplets
    },
    {
      id: '2',
      title: 'Regular Physical Activity',
      category: 'exercise',
      description: 'Regular exercise strengthens your heart, improves circulation, and helps maintain a healthy weight while boosting mental health.',
      benefits: [
        'Stronger cardiovascular system',
        'Better mood and reduced stress',
        'Improved bone density',
        'Enhanced immune function',
        'Better sleep quality'
      ],
      howTo: [
        'Aim for 150 minutes of moderate exercise weekly',
        'Include both cardio and strength training',
        'Start with 10-minute walks if you\'re a beginner',
        'Choose activities you enjoy',
        'Schedule exercise like any important appointment'
      ],
      frequency: '3-5 times per week',
      difficulty: 'moderate',
      icon: Dumbbell
    },
    {
      id: '3',
      title: 'Balanced Nutrition',
      category: 'nutrition',
      description: 'A balanced diet provides essential nutrients for optimal body function, disease prevention, and maintaining energy levels.',
      benefits: [
        'Stable energy throughout the day',
        'Stronger immune system',
        'Better weight management',
        'Reduced risk of chronic diseases',
        'Improved mental clarity'
      ],
      howTo: [
        'Fill half your plate with fruits and vegetables',
        'Choose whole grains over refined grains',
        'Include lean proteins in every meal',
        'Limit processed foods and added sugars',
        'Practice portion control'
      ],
      frequency: 'Every meal',
      difficulty: 'moderate',
      icon: Apple
    },
    {
      id: '4',
      title: 'Quality Sleep Habits',
      category: 'sleep',
      description: 'Good sleep is crucial for physical recovery, mental health, immune function, and overall well-being.',
      benefits: [
        'Better memory and concentration',
        'Improved immune function',
        'Better mood regulation',
        'Enhanced physical recovery',
        'Reduced risk of chronic diseases'
      ],
      howTo: [
        'Maintain consistent sleep schedule',
        'Create a relaxing bedtime routine',
        'Keep bedroom cool, dark, and quiet',
        'Avoid screens 1 hour before bed',
        'Limit caffeine intake after 2 PM'
      ],
      frequency: '7-9 hours nightly',
      difficulty: 'moderate',
      icon: Moon
    },
    {
      id: '5',
      title: 'Stress Management',
      category: 'mental',
      description: 'Managing stress effectively is essential for mental health and can prevent many physical health problems.',
      benefits: [
        'Lower blood pressure',
        'Reduced anxiety and depression',
        'Better immune function',
        'Improved relationships',
        'Enhanced decision-making'
      ],
      howTo: [
        'Practice deep breathing exercises',
        'Try meditation or mindfulness',
        'Regular physical activity',
        'Maintain social connections',
        'Set realistic goals and priorities'
      ],
      frequency: 'Daily practice',
      difficulty: 'moderate',
      icon: Brain
    },
    {
      id: '6',
      title: 'Preventive Health Checkups',
      category: 'prevention',
      description: 'Regular health screenings can detect problems early when they\'re easier to treat and prevent complications.',
      benefits: [
        'Early disease detection',
        'Better treatment outcomes',
        'Peace of mind',
        'Cost savings on healthcare',
        'Improved life expectancy'
      ],
      howTo: [
        'Schedule annual physical exams',
        'Get age-appropriate screenings',
        'Stay up-to-date with vaccinations',
        'Monitor blood pressure regularly',
        'Keep track of family health history'
      ],
      frequency: 'Annually or as recommended',
      difficulty: 'easy',
      icon: Shield
    },
    {
      id: '7',
      title: 'Fresh Air and Sunlight',
      category: 'general',
      description: 'Spending time outdoors provides vitamin D, fresh air, and connection with nature, all beneficial for health.',
      benefits: [
        'Vitamin D production',
        'Improved mood',
        'Better air quality exposure',
        'Enhanced immune function',
        'Reduced stress levels'
      ],
      howTo: [
        'Spend 15-30 minutes outside daily',
        'Take walks in parks or natural areas',
        'Exercise outdoors when possible',
        'Open windows for fresh air circulation',
        'Practice outdoor hobbies'
      ],
      frequency: 'Daily',
      difficulty: 'easy',
      icon: Sun
    },
    {
      id: '8',
      title: 'Hand Hygiene',
      category: 'prevention',
      description: 'Proper hand washing is one of the most effective ways to prevent the spread of infections and illness.',
      benefits: [
        'Reduced infection risk',
        'Protection of others',
        'Lower healthcare costs',
        'Fewer sick days',
        'Better overall health'
      ],
      howTo: [
        'Wash hands for at least 20 seconds',
        'Use soap and warm water',
        'Clean under fingernails',
        'Dry with clean towel or air dry',
        'Use hand sanitizer when soap unavailable'
      ],
      frequency: 'Multiple times daily',
      difficulty: 'easy',
      icon: Shield
    }
  ];

  const categories = [
    { value: 'all', label: 'All Tips', icon: Heart },
    { value: 'nutrition', label: 'Nutrition', icon: Apple },
    { value: 'exercise', label: 'Exercise', icon: Dumbbell },
    { value: 'mental', label: 'Mental Health', icon: Brain },
    { value: 'prevention', label: 'Prevention', icon: Shield },
    { value: 'sleep', label: 'Sleep', icon: Moon },
    { value: 'general', label: 'General', icon: TrendingUp }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? healthTips 
    : healthTips.filter(tip => tip.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-secondary text-secondary-foreground';
      case 'moderate': return 'bg-accent text-accent-foreground';
      case 'challenging': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return CheckCircle;
      case 'moderate': return Target;
      case 'challenging': return TrendingUp;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Heart className="h-8 w-8 text-primary" />
          Health Tips & Prevention
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Evidence-based health tips to help you maintain optimal wellness, prevent diseases, 
          and improve your quality of life through simple daily practices.
        </p>
      </div>

      {/* Category Filter */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Browse by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Health Tips */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {filteredTips.length} Health Tip{filteredTips.length !== 1 ? 's' : ''}
          </h3>
          <Badge variant="secondary">
            {selectedCategory === 'all' ? 'All Categories' : categories.find(c => c.value === selectedCategory)?.label}
          </Badge>
        </div>

        <div className="grid gap-6">
          {filteredTips.map((tip) => {
            const TipIcon = tip.icon;
            const DifficultyIcon = getDifficultyIcon(tip.difficulty);
            
            return (
              <Card key={tip.id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                        <TipIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{tip.title}</CardTitle>
                        <p className="text-muted-foreground text-sm mt-1">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="capitalize">
                        {tip.category}
                      </Badge>
                      <Badge className={getDifficultyColor(tip.difficulty)}>
                        <DifficultyIcon className="h-3 w-3 mr-1" />
                        {tip.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tip.frequency}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="benefits" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      <TabsTrigger value="howto">How To</TabsTrigger>
                      <TabsTrigger value="overview">Quick View</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="benefits" className="mt-4">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-secondary" />
                          Health Benefits
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {tip.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                              <CheckCircle className="h-3 w-3 text-secondary mt-1 flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="howto" className="mt-4">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          How to Implement
                        </h4>
                        <div className="space-y-2">
                          {tip.howTo.map((step, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
                                {index + 1}
                              </div>
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="overview" className="mt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Quick Benefits</h5>
                          <ul className="space-y-1">
                            {tip.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-secondary" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Getting Started</h5>
                          <ul className="space-y-1">
                            {tip.howTo.slice(0, 3).map((step, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </div>
                                {step}
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
      </div>

      {/* Daily Health Reminders */}
      <Card className="border-secondary bg-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-secondary" />
            Daily Health Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3">Morning Routine</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary" />
                  Drink a glass of water upon waking
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary" />
                  Eat a nutritious breakfast
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary" />
                  Take 5 minutes for deep breathing
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary" />
                  Plan your physical activity
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Evening Routine</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary" />
                  Reflect on the day's achievements
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary" />
                  Prepare for tomorrow
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary" />
                  Limit screen time 1 hour before bed
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-secondary" />
                  Practice relaxation techniques
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Health Information */}
      <Card className="border-destructive bg-destructive/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-destructive mb-2">When to Seek Immediate Medical Help</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Emergency Symptoms:</p>
                  <ul className="space-y-1">
                    <li>• Severe chest pain or pressure</li>
                    <li>• Difficulty breathing or shortness of breath</li>
                    <li>• Sudden severe headache</li>
                    <li>• Signs of stroke (FAST test)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Emergency Contacts:</p>
                  <ul className="space-y-1">
                    <li>• Emergency Services: 911 / 108</li>
                    <li>• Poison Control: 1-800-222-1222</li>
                    <li>• Mental Health Crisis: 988</li>
                    <li>• Your Healthcare Provider</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthTips;