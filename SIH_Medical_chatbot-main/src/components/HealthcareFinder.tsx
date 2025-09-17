import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Navigation, 
  Search,
  Hospital,
  Stethoscope,
  Ambulance
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'emergency' | 'pharmacy';
  address: string;
  phone: string;
  rating: number;
  distance: number;
  openHours: string;
  specialties: string[];
  coordinates: { lat: number; lng: number };
  isOpen: boolean;
}

const HealthcareFinder = () => {
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock healthcare facilities data
  const mockFacilities: HealthcareFacility[] = [
    {
      id: '1',
      name: 'City General Hospital',
      type: 'hospital',
      address: '123 Healthcare Avenue, Downtown',
      phone: '+1 (555) 123-4567',
      rating: 4.5,
      distance: 2.3,
      openHours: '24/7',
      specialties: ['Emergency Care', 'Cardiology', 'Surgery', 'Pediatrics'],
      coordinates: { lat: 40.7128, lng: -74.0060 },
      isOpen: true
    },
    {
      id: '2',
      name: 'QuickCare Medical Clinic',
      type: 'clinic',
      address: '456 Wellness Street, Midtown',
      phone: '+1 (555) 234-5678',
      rating: 4.2,
      distance: 1.2,
      openHours: '8:00 AM - 8:00 PM',
      specialties: ['Primary Care', 'Urgent Care', 'Vaccinations'],
      coordinates: { lat: 40.7580, lng: -73.9855 },
      isOpen: true
    },
    {
      id: '3',
      name: 'Emergency Response Center',
      type: 'emergency',
      address: '789 Rescue Road, Emergency District',
      phone: '+1 (555) 345-6789',
      rating: 4.8,
      distance: 0.8,
      openHours: '24/7',
      specialties: ['Trauma Care', 'Emergency Medicine', 'Ambulance Services'],
      coordinates: { lat: 40.7489, lng: -73.9680 },
      isOpen: true
    },
    {
      id: '4',
      name: 'Family Health Center',
      type: 'clinic',
      address: '321 Community Lane, Suburbs',
      phone: '+1 (555) 456-7890',
      rating: 4.3,
      distance: 3.1,
      openHours: '9:00 AM - 6:00 PM',
      specialties: ['Family Medicine', 'Pediatrics', 'Women\'s Health'],
      coordinates: { lat: 40.7282, lng: -74.0776 },
      isOpen: false
    },
    {
      id: '5',
      name: 'MediPharm Plus',
      type: 'pharmacy',
      address: '654 Pharmacy Plaza, Healthcare District',
      phone: '+1 (555) 567-8901',
      rating: 4.1,
      distance: 1.8,
      openHours: '7:00 AM - 10:00 PM',
      specialties: ['Prescription Medications', 'Health Products', 'Consultations'],
      coordinates: { lat: 40.7505, lng: -73.9934 },
      isOpen: true
    }
  ];

  const facilityTypes = [
    { value: 'all', label: 'All Types', icon: MapPin },
    { value: 'hospital', label: 'Hospitals', icon: Hospital },
    { value: 'clinic', label: 'Clinics', icon: Stethoscope },
    { value: 'emergency', label: 'Emergency', icon: Ambulance },
    { value: 'pharmacy', label: 'Pharmacies', icon: MapPin }
  ];

  useEffect(() => {
    getCurrentLocation();
    loadFacilities();
  }, []);

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Access Denied",
            description: "Enable location services for better results",
            variant: "destructive",
          });
        }
      );
    }
  };

  const loadFacilities = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFacilities(mockFacilities);
      setIsLoading(false);
    }, 1000);
  };

  const searchFacilities = () => {
    setIsLoading(true);
    // Simulate search API call
    setTimeout(() => {
      let filtered = mockFacilities;
      
      if (selectedType !== 'all') {
        filtered = filtered.filter(facility => facility.type === selectedType);
      }
      
      if (searchLocation.trim()) {
        filtered = filtered.filter(facility => 
          facility.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
          facility.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
          facility.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchLocation.toLowerCase())
          )
        );
      }
      
      // Sort by distance
      filtered.sort((a, b) => a.distance - b.distance);
      
      setFacilities(filtered);
      setIsLoading(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${filtered.length} healthcare facilities`,
      });
    }, 800);
  };

  const getDirections = (facility: HealthcareFacility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const callFacility = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital': return Hospital;
      case 'clinic': return Stethoscope;
      case 'emergency': return Ambulance;
      case 'pharmacy': return MapPin;
      default: return MapPin;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hospital': return 'bg-primary text-primary-foreground';
      case 'clinic': return 'bg-secondary text-secondary-foreground';
      case 'emergency': return 'bg-destructive text-destructive-foreground';
      case 'pharmacy': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Find Healthcare Facilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Search by name, location, or specialty..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={searchFacilities} disabled={isLoading}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Facility Type Filter */}
          <div className="flex flex-wrap gap-2">
            {facilityTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  variant={selectedType === type.value ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {isLoading ? 'Searching...' : `${facilities.length} Facilities Found`}
          </h3>
          {userLocation && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Navigation className="h-3 w-3" />
              Location Enabled
            </Badge>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {facilities.map((facility) => {
              const TypeIcon = getTypeIcon(facility.type);
              return (
                <Card key={facility.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(facility.type)}`}>
                          <TypeIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{facility.name}</h4>
                          <p className="text-muted-foreground text-sm">{facility.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{facility.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{facility.distance} km away</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{facility.openHours}</span>
                          <Badge 
                            variant={facility.isOpen ? "secondary" : "destructive"}
                            className="ml-2"
                          >
                            {facility.isOpen ? "Open" : "Closed"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{facility.phone}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {facility.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {facility.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{facility.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => getDirections(facility)}
                        variant="default"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Navigation className="h-4 w-4" />
                        Directions
                      </Button>
                      <Button 
                        onClick={() => callFacility(facility.phone)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!isLoading && facilities.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Facilities Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or location
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Emergency Contact Card */}
      <Card className="border-destructive bg-destructive/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive text-destructive-foreground">
                <Ambulance className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-destructive">Emergency Services</h4>
                <p className="text-sm text-muted-foreground">Available 24/7 for life-threatening emergencies</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => callFacility('911')}
                variant="destructive"
                size="sm"
              >
                Call 911
              </Button>
              <Button 
                onClick={() => callFacility('108')}
                variant="outline"
                size="sm"
              >
                Call 108
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthcareFinder;