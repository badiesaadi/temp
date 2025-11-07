import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { facilitiesAPI } from '@/services/api';
import { toast } from 'sonner';

export default function MinistryDashboard() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      const res = await facilitiesAPI.list();
      setFacilities(res.data || []);
    } catch (error) {
      toast.error('Failed to load facilities');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  const totalBeds = facilities.reduce((sum, f) => sum + (f.beds || 0), 0);
  const avgOccupancy = facilities.length > 0 
    ? (facilities.reduce((sum, f) => sum + (f.occupancy || 0), 0) / facilities.length).toFixed(1)
    : 0;

  return (
    <main className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Ministry of Health Dashboard</h1>
          <p className="text-muted-foreground">National healthcare coordination and oversight</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Total Facilities</span>
            </div>
            <div className="text-2xl font-bold">{facilities.length}</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Total Beds</div>
            <div className="text-2xl font-bold">{totalBeds}</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Avg Occupancy</div>
            <div className="text-2xl font-bold">{avgOccupancy}%</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">High Occupancy</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {facilities.filter(f => (f.occupancy || 0) > 85).length}
            </div>
          </Card>
        </div>

        <Tabs defaultValue="facilities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="facilities">Healthcare Facilities</TabsTrigger>
            <TabsTrigger value="requests">Resource Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="facilities" className="space-y-4">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Healthcare Network</h2>
                <Button>Add New Facility</Button>
              </div>
              <div className="space-y-3">
                {facilities.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No facilities registered</p>
                ) : (
                  facilities.map((facility) => (
                    <Card key={facility.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{facility.name}</h3>
                          <p className="text-sm text-muted-foreground">{facility.location}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center">
                          <div>
                            <div className="text-sm text-muted-foreground">Beds</div>
                            <div className="text-lg font-bold">{facility.beds || 0}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Occupancy</div>
                            <div className={`text-lg font-bold ${(facility.occupancy || 0) > 85 ? 'text-red-600' : 'text-green-600'}`}>
                              {facility.occupancy || 0}%
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Staff</div>
                            <div className="text-lg font-bold">{facility.staff_count || 0}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Resource Requests</h2>
              <p className="text-muted-foreground">Resource request management coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">National Health Analytics</h2>
              <p className="text-muted-foreground">Advanced analytics and predictive models coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
