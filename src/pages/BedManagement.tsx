import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Bed, UserPlus, Filter } from 'lucide-react';

interface BedItem {
  id: string;
  roomNumber: string;
  bedNumber: string;
  department: string;
  status: 'Available' | 'Occupied' | 'Maintenance';
  gender: 'Male' | 'Female' | 'Any';
  patientName?: string;
  admissionDate?: string;
  dischargeDate?: string;
}

export default function BedManagement() {
  const { patients, setPatients } = useAppContext();
  const [beds, setBeds] = useState<BedItem[]>([
    { id: 'b1', roomNumber: '101', bedNumber: '1', department: 'ICU', status: 'Occupied', gender: 'Male', patientName: 'Youssef Alami', admissionDate: '2025-11-05', dischargeDate: '2025-11-12' },
    { id: 'b2', roomNumber: '101', bedNumber: '2', department: 'ICU', status: 'Available', gender: 'Male' },
    { id: 'b3', roomNumber: '102', bedNumber: '1', department: 'ICU', status: 'Available', gender: 'Female' },
    { id: 'b4', roomNumber: '201', bedNumber: '1', department: 'Surgery', status: 'Maintenance', gender: 'Any' },
    { id: 'b5', roomNumber: '301', bedNumber: '1', department: 'General', status: 'Available', gender: 'Any' },
    { id: 'b6', roomNumber: '301', bedNumber: '2', department: 'General', status: 'Occupied', gender: 'Female', patientName: 'Leila Boukhari', admissionDate: '2025-11-06', dischargeDate: '2025-11-10' },
    { id: 'b7', roomNumber: '302', bedNumber: '1', department: 'Maternity', status: 'Available', gender: 'Female' },
    { id: 'b8', roomNumber: '302', bedNumber: '2', department: 'Maternity', status: 'Available', gender: 'Female' },
  ]);

  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [admitDialogOpen, setAdmitDialogOpen] = useState(false);
  
  const [newAdmission, setNewAdmission] = useState({
    patientName: '',
    gender: 'Male' as 'Male' | 'Female',
    department: 'General',
    triageLevel: 'Moderate',
    dischargeDate: '',
  });

  const filteredBeds = beds.filter(bed => {
    if (filterDepartment !== 'all' && bed.department !== filterDepartment) return false;
    if (filterStatus !== 'all' && bed.status !== filterStatus) return false;
    return true;
  });

  const autoAssignBed = (gender: 'Male' | 'Female', department: string) => {
    // Smart bed allocation algorithm respecting gender and specialty
    const availableBeds = beds.filter(
      bed => bed.status === 'Available' && 
      bed.department === department &&
      (bed.gender === gender || bed.gender === 'Any')
    );
    
    if (availableBeds.length === 0) {
      // Try any department if preferred not available
      const anyBeds = beds.filter(
        bed => bed.status === 'Available' && 
        (bed.gender === gender || bed.gender === 'Any')
      );
      return anyBeds[0] || null;
    }
    
    return availableBeds[0];
  };

  const handleAdmitPatient = () => {
    if (!newAdmission.patientName || !newAdmission.dischargeDate) {
      toast.error('Please fill all required fields');
      return;
    }

    const assignedBed = autoAssignBed(newAdmission.gender, newAdmission.department);
    
    if (!assignedBed) {
      toast.error(`No available beds for ${newAdmission.gender} patients in ${newAdmission.department}`);
      return;
    }

    const updatedBeds = beds.map(bed => 
      bed.id === assignedBed.id 
        ? { 
            ...bed, 
            status: 'Occupied' as const, 
            patientName: newAdmission.patientName,
            admissionDate: new Date().toISOString().split('T')[0],
            dischargeDate: newAdmission.dischargeDate 
          }
        : bed
    );

    setBeds(updatedBeds);
    toast.success(`Patient admitted to Room ${assignedBed.roomNumber}, Bed ${assignedBed.bedNumber}`);
    
    setNewAdmission({
      patientName: '',
      gender: 'Male',
      department: 'General',
      triageLevel: 'Moderate',
      dischargeDate: '',
    });
    setAdmitDialogOpen(false);
  };

  const handleDischarge = (bedId: string) => {
    const updatedBeds = beds.map(bed => 
      bed.id === bedId 
        ? { ...bed, status: 'Available' as const, patientName: undefined, admissionDate: undefined, dischargeDate: undefined }
        : bed
    );
    setBeds(updatedBeds);
    toast.success('Patient discharged successfully');
  };

  const stats = {
    total: beds.length,
    occupied: beds.filter(b => b.status === 'Occupied').length,
    available: beds.filter(b => b.status === 'Available').length,
    maintenance: beds.filter(b => b.status === 'Maintenance').length,
  };

  const occupancyRate = ((stats.occupied / stats.total) * 100).toFixed(1);

  return (
    <main className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bed Management</h1>
            <p className="text-muted-foreground">Automated bed allocation and patient flow</p>
          </div>
          
          <Dialog open={admitDialogOpen} onOpenChange={setAdmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Admit Patient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Admit New Patient</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Patient Name</Label>
                  <Input 
                    value={newAdmission.patientName}
                    onChange={(e) => setNewAdmission({...newAdmission, patientName: e.target.value})}
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select value={newAdmission.gender} onValueChange={(value: 'Male' | 'Female') => setNewAdmission({...newAdmission, gender: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select value={newAdmission.department} onValueChange={(value) => setNewAdmission({...newAdmission, department: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="Maternity">Maternity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Triage Level</Label>
                  <Select value={newAdmission.triageLevel} onValueChange={(value) => setNewAdmission({...newAdmission, triageLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Expected Discharge Date</Label>
                  <Input 
                    type="date"
                    value={newAdmission.dischargeDate}
                    onChange={(e) => setNewAdmission({...newAdmission, dischargeDate: e.target.value})}
                  />
                </div>
                <Button onClick={handleAdmitPatient} className="w-full">
                  Auto-Assign Bed & Admit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Total Beds</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Occupied</div>
            <div className="text-2xl font-bold text-red-600">{stats.occupied}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Available</div>
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Occupancy Rate</div>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
          </Card>
        </div>

        <Card className="p-4">
          <div className="flex gap-4 items-center mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="ICU">ICU</SelectItem>
                <SelectItem value="Surgery">Surgery</SelectItem>
                <SelectItem value="Maternity">Maternity</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBeds.map(bed => (
              <Card key={bed.id} className="p-4 border-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">Room {bed.roomNumber} - Bed {bed.bedNumber}</div>
                      <div className="text-sm text-muted-foreground">{bed.department}</div>
                    </div>
                  </div>
                  <Badge variant={
                    bed.status === 'Available' ? 'default' : 
                    bed.status === 'Occupied' ? 'destructive' : 
                    'secondary'
                  }>
                    {bed.status}
                  </Badge>
                </div>
                
                <div className="text-sm space-y-1 mt-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender:</span>
                    <span>{bed.gender}</span>
                  </div>
                  
                  {bed.status === 'Occupied' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patient:</span>
                        <span className="font-medium">{bed.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Admitted:</span>
                        <span>{bed.admissionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discharge:</span>
                        <span>{bed.dischargeDate}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={() => handleDischarge(bed.id)}
                      >
                        Discharge Patient
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
