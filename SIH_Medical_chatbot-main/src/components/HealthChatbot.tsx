import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Globe, 
  MapPin, 
  AlertTriangle,
  Heart,
  Brain,
  Stethoscope,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import healthHero from '@/assets/health-hero.jpg';
import { getGeminiResponse } from '../services/geminiApi';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'symptom' | 'disease' | 'location' | 'general';
}

interface Disease {
  name: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  treatment: string;
  severity: 'low' | 'medium' | 'high';
}

const HealthChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Health Assistant. I can help you with disease information, symptom checking, and finding nearby healthcare facilities. How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Medical knowledge base
  const medicalKnowledge: Record<string, Disease> = {
    'fever': {
      name: 'Fever',
      symptoms: ['High temperature', 'Chills', 'Sweating', 'Headache', 'Muscle aches'],
      causes: ['Viral infection', 'Bacterial infection', 'Heat exhaustion', 'Medications'],
      prevention: ['Regular handwashing', 'Avoid close contact with sick people', 'Stay hydrated'],
      treatment: 'Rest, fluids, fever-reducing medications. Consult doctor if fever persists.',
      severity: 'medium'
    },
    'headache': {
      name: 'Headache',
      symptoms: ['Head pain', 'Sensitivity to light', 'Nausea', 'Neck stiffness'],
      causes: ['Tension', 'Migraine', 'Dehydration', 'Stress', 'Lack of sleep'],
      prevention: ['Regular sleep schedule', 'Stay hydrated', 'Manage stress', 'Avoid triggers'],
      treatment: 'Rest in dark room, pain relievers, hydration. See doctor for severe headaches.',
      severity: 'low'
    },
    'cough': {
      name: 'Cough',
      symptoms: ['Persistent coughing', 'Throat irritation', 'Mucus production'],
      causes: ['Common cold', 'Allergies', 'Asthma', 'Pneumonia', 'COPD'],
      prevention: ['Avoid irritants', 'Stay hydrated', 'Hand hygiene', 'Avoid smoking'],
      treatment: 'Honey, warm liquids, humidifier. See doctor if persistent or with blood.',
      severity: 'medium'
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' }
  ];

  const quickActions = [
    { icon: Brain, label: 'Symptom Checker', action: 'symptom' },
    { icon: Heart, label: 'Disease Info', action: 'disease' },
    { icon: MapPin, label: 'Find Hospitals', action: 'location' },
    { icon: Stethoscope, label: 'Health Tips', action: 'tips' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const processUserQuery = async (query: string, type?: string) => {
    setIsTyping(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response = '';
    let messageType: 'symptom' | 'disease' | 'location' | 'general' = 'general';

    const lowerQuery = query.toLowerCase();

    // Symptom checking logic
    if (type === 'symptom' || lowerQuery.includes('symptom') || lowerQuery.includes('pain') || lowerQuery.includes('ache')) {
      const symptoms = Object.keys(medicalKnowledge).filter(key => 
        lowerQuery.includes(key) || medicalKnowledge[key].symptoms.some(symptom => 
          lowerQuery.includes(symptom.toLowerCase())
        )
      );

      if (symptoms.length > 0) {
        const disease = medicalKnowledge[symptoms[0]];
        response = `Based on your symptoms, you might be experiencing ${disease.name}. 

**Common symptoms include:**
${disease.symptoms.map(s => `• ${s}`).join('\n')}

**Possible causes:**
${disease.causes.map(c => `• ${c}`).join('\n')}

**Recommended actions:**
${disease.treatment}

⚠️ **Important:** This is for informational purposes only. Please consult a healthcare professional for proper diagnosis and treatment.`;
        messageType = 'symptom';
      } else {
        response = 'I understand you\'re experiencing symptoms. Could you describe them more specifically? For example, do you have fever, headache, cough, or other concerns?';
        messageType = 'symptom';
      }
    }
    // Disease information
    else if (type === 'disease' || lowerQuery.includes('what is') || lowerQuery.includes('disease') || lowerQuery.includes('condition')) {
      const disease = Object.keys(medicalKnowledge).find(key => lowerQuery.includes(key));
      if (disease) {
        const info = medicalKnowledge[disease];
        response = `**${info.name}** Information:

**Symptoms:**
${info.symptoms.map(s => `• ${s}`).join('\n')}

**Common Causes:**
${info.causes.map(c => `• ${c}`).join('\n')}

**Prevention:**
${info.prevention.map(p => `• ${p}`).join('\n')}

**Treatment Approach:**
${info.treatment}

Severity Level: ${info.severity.toUpperCase()}`;
        messageType = 'disease';
      } else {
        response = 'I can provide information about common conditions like fever, headache, cough, and many others. What specific condition would you like to learn about?';
        messageType = 'disease';
      }
    }
    // Location-based queries
    else if (type === 'location' || lowerQuery.includes('hospital') || lowerQuery.includes('clinic') || lowerQuery.includes('doctor') || lowerQuery.includes('near me')) {
      response = `🏥 **Healthcare Facilities Near You:**

I can help you find nearby healthcare facilities. Here are some options:

**Hospitals:**
• City General Hospital - 2.3 km away
• Medical Center Downtown - 4.1 km away
• Emergency Care Unit - 1.7 km away

**Clinics:**
• Family Health Clinic - 0.8 km away
• QuickCare Medical - 1.2 km away

**Emergency Services:**
📞 Emergency: 911 / 108
🚑 Ambulance: Available 24/7

Would you like detailed directions to any of these facilities?`;
      messageType = 'location';
    }
    // Health tips
    else if (type === 'tips' || lowerQuery.includes('tips') || lowerQuery.includes('prevention') || lowerQuery.includes('health')) {
      response = `🌟 **Daily Health Tips:**

**General Wellness:**
• Drink 8 glasses of water daily
• Get 7-9 hours of quality sleep
• Exercise for 30 minutes daily
• Eat 5 servings of fruits and vegetables

**Disease Prevention:**
• Wash hands frequently for 20+ seconds
• Maintain social distancing when ill
• Keep vaccinations up to date
• Practice stress management techniques

**When to Seek Medical Care:**
• Persistent fever over 101°F (38.3°C)
• Severe headache with vision changes
• Difficulty breathing or chest pain
• Sudden severe abdominal pain

Stay healthy and consult healthcare professionals when needed!`;
      messageType = 'general';
    }
    else {
      response = `I'm here to help with your health concerns. I can assist with:

🔍 **Symptom Checking** - Describe your symptoms for guidance
📚 **Disease Information** - Learn about conditions and treatments  
🏥 **Healthcare Locator** - Find nearby hospitals and clinics
💡 **Health Tips** - Daily wellness and prevention advice

What would you like to know about?`;
    }

    setIsTyping(false);
    
    const botMessage: Message = {
      id: Date.now().toString(),
      text: response,
      isBot: true,
      timestamp: new Date(),
      type: messageType
    };

    setMessages(prev => [...prev, botMessage]);

    // Text-to-speech for bot response
    if ('speechSynthesis' in window && !isSpeaking) {
      speakText(response);
    }
  };
const handleSendMessage = async () => {
  if (!inputText.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputText,
    isBot: false,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  const query = inputText;
  setInputText('');

  // Gemini API integration
  setIsTyping(true);
  try {
    const botReply = await getGeminiResponse(query);
    const botMessage: Message = {
      id: Date.now().toString(),
      text: botReply,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);

    // Text-to-speech for bot response
    if ('speechSynthesis' in window && !isSpeaking) {
      speakText(botReply);
    }
  } catch (error) {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "Sorry, I couldn't get a response from Gemini API.",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  }
  setIsTyping(false);
};

  const handleQuickAction = (action: string) => {
    const queries = {
      symptom: 'I need help checking my symptoms',
      disease: 'I want to learn about a medical condition',
      location: 'Find hospitals and clinics near me',
      tips: 'Give me some health tips'
    };

    const query = queries[action as keyof typeof queries] || 'Hello';
    setInputText(query);
    processUserQuery(query, action);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = currentLanguage;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now to ask your health question",
        });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or type your message",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Please type your message instead",
        variant: "destructive",
      });
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#•]/g, ''));
      utterance.lang = currentLanguage;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-hero overflow-hidden">
        <img 
          src={healthHero} 
          alt="Health and Medical Care"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Health Assistant
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Get reliable health information, symptom guidance, and find nearby healthcare facilities
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    variant="outline"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <action.icon className="h-5 w-5 text-primary" />
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-secondary" />
                  Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      onClick={() => setCurrentLanguage(lang.code)}
                      variant={currentLanguage === lang.code ? "default" : "outline"}
                      size="sm"
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-accent-light border-accent">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent-foreground">
                      Medical Disclaimer
                    </p>
                    <p className="text-xs text-accent-foreground/80 mt-1">
                      This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col shadow-lg">
              <CardHeader className="border-b bg-gradient-card">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
                    Health Chat Assistant
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      AI-Powered
                    </Badge>
                    <Button
                      onClick={isSpeaking ? stopSpeaking : undefined}
                      variant="ghost"
                      size="sm"
                    >
                      {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.isBot
                          ? 'bg-muted text-foreground shadow-chat'
                          : 'bg-primary text-primary-foreground shadow-chat'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-3 shadow-chat">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>

              <Separator />
              
              <div className="p-4">
                <div className="flex gap-2">
                  <div className="flex-1 flex gap-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ask about symptoms, diseases, or health concerns..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={startVoiceRecognition}
                      variant="outline"
                      size="icon"
                      disabled={isListening}
                      className={isListening ? 'bg-destructive text-destructive-foreground' : ''}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthChatbot;