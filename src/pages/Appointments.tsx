import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Plus } from 'lucide-react';
import AppointmentForm from '@/components/AppointmentForm';
import { useAppContext } from '@/context/AppContext';
import { fetchAppointments } from '@/utils/fakeAPI';

const Appointments = () => {
  const { appointments, setAppointments } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData as any);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddAppointment = (newAppointment: any) => {
    setAppointments([
      ...appointments,
      {
        id: Date.now().toString(),
        ...newAppointment,
        status: 'Scheduled',
      },
    ]);
  };

  const handleCancel = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-muted rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-primary-foreground p-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {appointments.map(appointment => (
          <div key={appointment.id} className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg text-foreground">{appointment.reason}</h3>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{appointment.doctor}</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success border border-success/20">
                {appointment.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{appointment.time}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-muted text-foreground py-2 rounded-lg font-medium hover:bg-muted/80 transition-colors">
                Reschedule
              </button>
              <button
                onClick={() => handleCancel(appointment.id)}
                className="flex-1 bg-destructive/10 text-destructive py-2 rounded-lg font-medium hover:bg-destructive/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <AppointmentForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddAppointment}
        />
      )}
    </div>
  );
};

export default Appointments;
