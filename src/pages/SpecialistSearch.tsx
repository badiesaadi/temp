import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  distance: number;
  rating: number;
  experience: number;
  availability: 'Available' | 'Busy' | 'Limited';
  nextAvailable: string;
}

export default function SpecialistSearch() {
  const [specialists] = useState<Specialist[]>([
    {
      id: '1',
      name: 'Dr. Amine Haddad',
      specialty: 'Cardiology',
      hospital: 'Hospital Mustapha Pacha',
      location: 'Algiers',
      distance: 2.5,
      rating: 4.8,
      experience: 15,
      availability: 'Available',
      nextAvailable: '2025-11-09',
    },
    {
      id: '2',
      name: 'Dr. Sara Benali',
      specialty: 'Neurology',
      hospital: 'CHU Oran',
      location: 'Oran',
      distance: 8.3,
      rating: 4.9,
      experience: 12,
      availability: 'Limited',
      nextAvailable: '2025-11-15',
    },
    {
      id: '3',
      name: 'Dr. Karim Mansouri',
      specialty: 'Oncology',
      hospital: 'Hospital Bab El Oued',
      location: 'Algiers',
      distance: 3.1,
      rating: 4.7,
      experience: 18,
      availability: 'Busy',
      nextAvailable: '2025-11-20',
    },
    {
      id: '4',
      name: 'Dr. Leila Boukhari',
      specialty: 'Pediatrics',
      hospital: 'CHU Blida',
      location: 'Blida',
      distance: 12.5,
      rating: 4.9,
      experience: 10,
      availability: 'Available',
      nextAvailable: '2025-11-08',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || specialist.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'all' || specialist.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleBookAppointment = (specialistName: string) => {
    toast.success(`Appointment request sent to ${specialistName}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="Specialist Search" />
      
      <main className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Find a Specialist</h1>
          <p className="text-muted-foreground">Search for specialists by name, specialty, or location</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="Neurology">Neurology</SelectItem>
                <SelectItem value="Oncology">Oncology</SelectItem>
                <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                <SelectItem value="Orthopedics">Orthopedics</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Algiers">Algiers</SelectItem>
                <SelectItem value="Oran">Oran</SelectItem>
                <SelectItem value="Blida">Blida</SelectItem>
                <SelectItem value="Annaba">Annaba</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="text-sm text-muted-foreground">
          Found {filteredSpecialists.length} specialist{filteredSpecialists.length !== 1 ? 's' : ''}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredSpecialists.map(specialist => (
            <Card key={specialist.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{specialist.name}</h3>
                  <p className="text-primary font-medium">{specialist.specialty}</p>
                </div>
                <Badge variant={
                  specialist.availability === 'Available' ? 'default' :
                  specialist.availability === 'Limited' ? 'secondary' :
                  'destructive'
                }>
                  {specialist.availability}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{specialist.hospital}</span>
                  <span className="text-muted-foreground">• {specialist.location}</span>
                  <span className="text-muted-foreground">• {specialist.distance} km</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{specialist.rating}</span>
                  </div>
                  <span className="text-muted-foreground">{specialist.experience} years experience</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Next available:</span>
                  <span className="font-medium">{specialist.nextAvailable}</span>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => handleBookAppointment(specialist.name)}
                disabled={specialist.availability === 'Busy'}
              >
                {specialist.availability === 'Busy' ? 'Currently Unavailable' : 'Book Appointment'}
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
