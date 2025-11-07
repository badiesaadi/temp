import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Plus } from 'lucide-react';
import { appointmentsAPI, recordsAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [apptRes, recordsRes] = await Promise.all([
        appointmentsAPI.myAppointments(),
        recordsAPI.clientRecords(user?.id || '')
      ]);
      setAppointments(apptRes.data || []);
      setRecords(recordsRes.data || []);
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-muted-foreground">Patient Portal</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">My Appointments</span>
            </div>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Medical Records</span>
            </div>
            <div className="text-2xl font-bold">{records.length}</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No appointments scheduled</p>
            ) : (
              appointments.map((appt) => (
                <Card key={appt.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{appt.doctor_name}</h3>
                      <p className="text-sm text-muted-foreground">{appt.date} at {appt.time}</p>
                      <p className="text-sm mt-1">{appt.reason}</p>
                    </div>
                    <Badge>{appt.status}</Badge>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Medical Records</h2>
          <div className="space-y-3">
            {records.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No medical records</p>
            ) : (
              records.map((record) => (
                <Card key={record.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{record.diagnosis}</h3>
                      <p className="text-sm text-muted-foreground">Dr. {record.doctor_name} - {record.date}</p>
                      <p className="text-sm mt-1">{record.prescription}</p>
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
