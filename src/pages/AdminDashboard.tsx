import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Calendar, Activity } from 'lucide-react';
import { facilitiesAPI, appointmentsAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [facility, setFacility] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [facilityRes, appointmentsRes] = await Promise.all([
        facilitiesAPI.myFacility(),
        appointmentsAPI.facilityAppointments()
      ]);
      setFacility(facilityRes.data);
      setAppointments(appointmentsRes.data || []);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  return (
    <main className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hospital Administration</h1>
          <p className="text-muted-foreground">{facility?.name || 'Your Facility'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Facility</span>
            </div>
            <div className="text-lg font-bold">{facility?.name || 'N/A'}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Staff Count</span>
            </div>
            <div className="text-2xl font-bold">{facility?.staff_count || 0}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Appointments</span>
            </div>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Occupancy</span>
            </div>
            <div className="text-2xl font-bold">{facility?.occupancy || 0}%</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Facility Appointments</h2>
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No appointments</p>
            ) : (
              appointments.map((appt) => (
                <Card key={appt.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{appt.patient_name}</h3>
                        <Badge>{appt.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Dr. {appt.doctor_name} - {appt.date} at {appt.time}
                      </p>
                      <p className="text-sm mt-1">{appt.reason}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
