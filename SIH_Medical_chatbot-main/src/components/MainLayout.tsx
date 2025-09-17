import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Search, 
  MapPin, 
  Heart, 
  Brain, 
  Menu,
  X,
  Stethoscope,
  Shield,
  Activity
} from 'lucide-react';
import HealthChatbot from './HealthChatbot';
import DiseaseDatabase from './DiseaseDatabase';
import SymptomChecker from './SymptomChecker';
import HealthcareFinder from './HealthcareFinder';
import HealthTips from './HealthTips';

type ActiveView = 'chat' | 'database' | 'symptoms' | 'finder' | 'tips';

const MainLayout = () => {
  const [activeView, setActiveView] = useState<ActiveView>('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { 
      id: 'chat' as ActiveView, 
      name: 'AI Chat', 
      icon: MessageCircle, 
      description: 'Interactive health assistant',
      color: 'bg-primary text-primary-foreground'
    },
    { 
      id: 'symptoms' as ActiveView, 
      name: 'Symptom Checker', 
      icon: Stethoscope, 
      description: 'Analyze your symptoms',
      color: 'bg-secondary text-secondary-foreground'
    },
    { 
      id: 'database' as ActiveView, 
      name: 'Disease Database', 
      icon: Search, 
      description: 'Medical information library',
      color: 'bg-accent text-accent-foreground'
    },
    { 
      id: 'finder' as ActiveView, 
      name: 'Healthcare Finder', 
      icon: MapPin, 
      description: 'Locate nearby facilities',
      color: 'bg-primary-light text-primary-dark'
    },
    { 
      id: 'tips' as ActiveView, 
      name: 'Health Tips', 
      icon: Heart, 
      description: 'Prevention & wellness',
      color: 'bg-secondary-light text-secondary'
    }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'chat':
        return <HealthChatbot />;
      case 'database':
        return <DiseaseDatabase />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'finder':
        return <HealthcareFinder />;
      case 'tips':
        return <HealthTips />;
      default:
        return <HealthChatbot />;
    }
  };

  const activeItem = navigationItems.find(item => item.id === activeView);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${activeItem?.color || 'bg-primary text-primary-foreground'}`}>
            {activeItem && <activeItem.icon className="h-5 w-5" />}
          </div>
          <div>
            <h1 className="font-semibold">{activeItem?.name}</h1>
            <p className="text-xs text-muted-foreground">{activeItem?.description}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <Card className="m-4 p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    variant={activeView === item.id ? "default" : "ghost"}
                    className="w-full justify-start gap-3 h-14"
                  >
                    <div className={`p-2 rounded ${activeView === item.id ? 'bg-primary-foreground/20' : item.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 border-r bg-card/50 min-h-screen">
          <div className="p-6">
            {/* Logo/Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-primary text-white">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AI Health Assistant</h1>
                  <p className="text-sm text-muted-foreground">Your trusted health companion</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">AI-Powered</Badge>
                <Badge variant="outline" className="text-xs">Multi-Language</Badge>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground mb-3">FEATURES</h2>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    variant={activeView === item.id ? "default" : "ghost"}
                    className="w-full justify-start gap-3 h-14"
                  >
                    <div className={`p-2 rounded ${activeView === item.id ? 'bg-primary-foreground/20' : item.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Button>
                );
              })}
            </nav>

            {/* Health Stats/Info */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">QUICK STATS</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Diseases in Database</span>
                  <Badge variant="secondary">50+</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Health Tips</span>
                  <Badge variant="secondary">100+</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Languages Supported</span>
                  <Badge variant="secondary">10+</Badge>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <Card className="mt-8 border-destructive/20 bg-destructive/5">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Emergency</span>
                </div>
                <p className="text-xs text-destructive-foreground/80 mb-3">
                  For medical emergencies, always call emergency services immediately.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive" className="text-xs">
                    Call 911
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    Call 108
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;