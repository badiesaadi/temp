import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, XCircle, FileText } from 'lucide-react';
import { appointmentsAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await appointmentsAPI.myAppointments();
      setAppointments(res.data || []);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId: string, status: string) => {
    try {
      await appointmentsAPI.updateStatus({ appointment_id: appointmentId, status });
      toast.success(`Appointment ${status}`);
      loadAppointments();
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const todayCount = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length;

  return (
    <main className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dr. {user?.name}</h1>
          <p className="text-muted-foreground">Doctor Portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Total Appointments</span>
            </div>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Today's Appointments</div>
            <div className="text-2xl font-bold">{todayCount}</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Pending Approvals</div>
            <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Appointments</h2>
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No appointments</p>
            ) : (
              appointments.map((appt) => (
                <Card key={appt.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{appt.patient_name}</h3>
                        <Badge variant={appt.status === 'pending' ? 'secondary' : 'default'}>
                          {appt.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{appt.date} at {appt.time}</p>
                      <p className="text-sm mt-1">{appt.reason}</p>
                    </div>
                    
                    {appt.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => updateStatus(appt.id, 'approved')}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => updateStatus(appt.id, 'cancelled')}>
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    )}
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
