import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface ResourceRequest {
  id: string;
  hospital: string;
  type: 'Specialist' | 'Equipment' | 'Supplies' | 'Staff';
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
  date: string;
}

export default function Government() {
  const [requests, setRequests] = useState<ResourceRequest[]>([
    {
      id: '1',
      hospital: 'Hospital Mustapha Pacha',
      type: 'Specialist',
      description: 'Request for Cardiologist - 2 weeks temporary transfer',
      priority: 'High',
      status: 'Pending',
      date: '2025-11-07',
    },
    {
      id: '2',
      hospital: 'CHU Oran',
      type: 'Equipment',
      description: 'MRI Machine - Urgent replacement needed',
      priority: 'Critical',
      status: 'Approved',
      date: '2025-11-06',
    },
    {
      id: '3',
      hospital: 'Hospital Bab El Oued',
      type: 'Supplies',
      description: 'Emergency supply of IV bags and syringes',
      priority: 'High',
      status: 'In Progress',
      date: '2025-11-05',
    },
    {
      id: '4',
      hospital: 'CHU Blida',
      type: 'Staff',
      description: 'Need 3 ICU nurses for night shift coverage',
      priority: 'Medium',
      status: 'Pending',
      date: '2025-11-07',
    },
  ]);

  const hospitalData = [
    { name: 'Hospital Mustapha Pacha', region: 'Algiers', beds: 450, occupancy: 89, staff: 320 },
    { name: 'CHU Oran', region: 'Oran', beds: 380, occupancy: 76, staff: 285 },
    { name: 'Hospital Bab El Oued', region: 'Algiers', beds: 280, occupancy: 92, staff: 210 },
    { name: 'CHU Blida', region: 'Blida', beds: 320, occupancy: 81, staff: 245 },
    { name: 'CHU Annaba', region: 'Annaba', beds: 290, occupancy: 68, staff: 195 },
  ];

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Approved' as const } : req
    ));
    toast.success('Request approved successfully');
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Rejected' as const } : req
    ));
    toast.error('Request rejected');
  };

  const stats = {
    totalHospitals: hospitalData.length,
    totalBeds: hospitalData.reduce((sum, h) => sum + h.beds, 0),
    avgOccupancy: (hospitalData.reduce((sum, h) => sum + h.occupancy, 0) / hospitalData.length).toFixed(1),
    totalStaff: hospitalData.reduce((sum, h) => sum + h.staff, 0),
    pendingRequests: requests.filter(r => r.status === 'Pending').length,
    criticalRequests: requests.filter(r => r.priority === 'Critical').length,
  };

  return (
    <main className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ministry Dashboard</h1>
          <p className="text-muted-foreground">National healthcare coordination and oversight</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Hospitals</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalHospitals}</div>
          </Card>
          
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Total Beds</div>
            <div className="text-2xl font-bold">{stats.totalBeds}</div>
          </Card>
          
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Avg Occupancy</div>
            <div className="text-2xl font-bold">{stats.avgOccupancy}%</div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Total Staff</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Pending</span>
            </div>
            <div className="text-2xl font-bold text-amber-600">{stats.pendingRequests}</div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Critical</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.criticalRequests}</div>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="requests">Resource Requests</TabsTrigger>
            <TabsTrigger value="hospitals">Hospital Overview</TabsTrigger>
            <TabsTrigger value="analytics">National Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Resource Requests</h2>
              <div className="space-y-3">
                {requests.map(request => (
                  <Card key={request.id} className="p-4 border-l-4" style={{
                    borderLeftColor: 
                      request.priority === 'Critical' ? '#ef4444' :
                      request.priority === 'High' ? '#f97316' :
                      request.priority === 'Medium' ? '#eab308' : '#84cc16'
                  }}>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{request.type}</Badge>
                          <span className="font-semibold">{request.hospital}</span>
                          <Badge variant={
                            request.status === 'Pending' ? 'secondary' :
                            request.status === 'Approved' ? 'default' :
                            request.status === 'In Progress' ? 'secondary' :
                            request.status === 'Completed' ? 'default' : 'destructive'
                          }>
                            {request.status}
                          </Badge>
                          <Badge variant={
                            request.priority === 'Critical' ? 'destructive' :
                            request.priority === 'High' ? 'destructive' :
                            'secondary'
                          }>
                            {request.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                        <p className="text-xs text-muted-foreground">Submitted: {request.date}</p>
                      </div>
                      
                      {request.status === 'Pending' && (
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" onClick={() => handleApprove(request.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="hospitals" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Hospital Network Status</h2>
              <div className="space-y-3">
                {hospitalData.map((hospital, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{hospital.name}</h3>
                        <p className="text-sm text-muted-foreground">{hospital.region}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <div className="text-sm text-muted-foreground">Beds</div>
                          <div className="text-lg font-bold">{hospital.beds}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Occupancy</div>
                          <div className={`text-lg font-bold ${hospital.occupancy > 85 ? 'text-red-600' : 'text-green-600'}`}>
                            {hospital.occupancy}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Staff</div>
                          <div className="text-lg font-bold">{hospital.staff}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">National Health Analytics</h2>
              <div className="text-muted-foreground">
                Advanced analytics and predictive models coming soon...
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
