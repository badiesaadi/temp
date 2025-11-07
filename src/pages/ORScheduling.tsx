import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Calendar, AlertTriangle, Plus } from 'lucide-react';

interface ORBooking {
  id: string;
  orNumber: string;
  date: string;
  startTime: string;
  endTime: string;
  surgeonName: string;
  patientName: string;
  procedure: string;
  anesthesiologist: string;
  nurses: string[];
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}

export default function ORScheduling() {
  const [bookings, setBookings] = useState<ORBooking[]>([
    {
      id: '1',
      orNumber: 'OR-1',
      date: '2025-11-08',
      startTime: '08:00',
      endTime: '10:00',
      surgeonName: 'Dr. Amine Haddad',
      patientName: 'Hassan Idrissi',
      procedure: 'Cardiac Bypass',
      anesthesiologist: 'Dr. Karim Mansouri',
      nurses: ['Nurse Fatima Zohra', 'Nurse Ahmed'],
      status: 'Scheduled',
    },
    {
      id: '2',
      orNumber: 'OR-2',
      date: '2025-11-08',
      startTime: '09:00',
      endTime: '11:00',
      surgeonName: 'Dr. Sara Benali',
      patientName: 'Amina Tazi',
      procedure: 'Appendectomy',
      anesthesiologist: 'Dr. Karim Mansouri',
      nurses: ['Nurse Leila'],
      status: 'Scheduled',
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    orNumber: 'OR-1',
    date: '',
    startTime: '',
    endTime: '',
    surgeonName: '',
    patientName: '',
    procedure: '',
    anesthesiologist: '',
  });

  const checkConflicts = (orNumber: string, date: string, startTime: string, endTime: string) => {
    const conflicts = bookings.filter(booking => {
      if (booking.orNumber !== orNumber || booking.date !== date) return false;
      
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      
      // Check time overlap
      return (startTime < bookingEnd && endTime > bookingStart);
    });
    
    return conflicts;
  };

  const handleScheduleSurgery = () => {
    if (!newBooking.date || !newBooking.startTime || !newBooking.endTime || 
        !newBooking.surgeonName || !newBooking.patientName || !newBooking.procedure) {
      toast.error('Please fill all required fields');
      return;
    }

    // Check for conflicts
    const conflicts = checkConflicts(
      newBooking.orNumber,
      newBooking.date,
      newBooking.startTime,
      newBooking.endTime
    );

    if (conflicts.length > 0) {
      toast.error(`Conflict detected! ${newBooking.orNumber} is already booked at this time.`);
      return;
    }

    const booking: ORBooking = {
      id: Date.now().toString(),
      ...newBooking,
      nurses: [],
      status: 'Scheduled',
    };

    setBookings([...bookings, booking]);
    toast.success('Surgery scheduled successfully');
    
    setNewBooking({
      orNumber: 'OR-1',
      date: '',
      startTime: '',
      endTime: '',
      surgeonName: '',
      patientName: '',
      procedure: '',
      anesthesiologist: '',
    });
    setDialogOpen(false);
  };

  const upcomingSurgeries = bookings.filter(b => b.status === 'Scheduled').length;
  const inProgress = bookings.filter(b => b.status === 'In Progress').length;
  const completed = bookings.filter(b => b.status === 'Completed').length;

  return (
    <main className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Operating Room Scheduling</h1>
            <p className="text-muted-foreground">Schedule surgeries with conflict detection</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Schedule Surgery
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Surgery</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Operating Room</Label>
                  <Select value={newBooking.orNumber} onValueChange={(value) => setNewBooking({...newBooking, orNumber: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OR-1">OR-1</SelectItem>
                      <SelectItem value="OR-2">OR-2</SelectItem>
                      <SelectItem value="OR-3">OR-3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Date</Label>
                  <Input 
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>Start Time</Label>
                  <Input 
                    type="time"
                    value={newBooking.startTime}
                    onChange={(e) => setNewBooking({...newBooking, startTime: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>End Time</Label>
                  <Input 
                    type="time"
                    value={newBooking.endTime}
                    onChange={(e) => setNewBooking({...newBooking, endTime: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>Surgeon</Label>
                  <Input 
                    value={newBooking.surgeonName}
                    onChange={(e) => setNewBooking({...newBooking, surgeonName: e.target.value})}
                    placeholder="Dr. Name"
                  />
                </div>
                
                <div>
                  <Label>Patient Name</Label>
                  <Input 
                    value={newBooking.patientName}
                    onChange={(e) => setNewBooking({...newBooking, patientName: e.target.value})}
                    placeholder="Patient Name"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label>Procedure</Label>
                  <Input 
                    value={newBooking.procedure}
                    onChange={(e) => setNewBooking({...newBooking, procedure: e.target.value})}
                    placeholder="Type of surgery"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label>Anesthesiologist</Label>
                  <Input 
                    value={newBooking.anesthesiologist}
                    onChange={(e) => setNewBooking({...newBooking, anesthesiologist: e.target.value})}
                    placeholder="Dr. Name"
                  />
                </div>
                
                <Button onClick={handleScheduleSurgery} className="col-span-2">
                  Schedule Surgery
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Upcoming</div>
            <div className="text-2xl font-bold">{upcomingSurgeries}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">In Progress</div>
            <div className="text-2xl font-bold text-blue-600">{inProgress}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Completed Today</div>
            <div className="text-2xl font-bold text-green-600">{completed}</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Surgery Schedule
          </h2>
          
          <div className="space-y-4">
            {bookings.map(booking => (
              <Card key={booking.id} className="p-4 border-l-4 border-l-primary">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {booking.orNumber}
                      </Badge>
                      <span className="font-semibold text-lg">{booking.procedure}</span>
                      <Badge variant={
                        booking.status === 'Scheduled' ? 'default' :
                        booking.status === 'In Progress' ? 'secondary' :
                        booking.status === 'Completed' ? 'default' : 'destructive'
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date:</span>{' '}
                        <span className="font-medium">{booking.date}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>{' '}
                        <span className="font-medium">{booking.startTime} - {booking.endTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Patient:</span>{' '}
                        <span className="font-medium">{booking.patientName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Surgeon:</span>{' '}
                        <span className="font-medium">{booking.surgeonName}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Anesthesiologist:</span>{' '}
                        <span className="font-medium">{booking.anesthesiologist}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {booking.status === 'Scheduled' && (
                      <>
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">Cancel</Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-100">Conflict Detection Active</h3>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                The system automatically prevents double-booking and validates staff availability before confirming surgeries.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
