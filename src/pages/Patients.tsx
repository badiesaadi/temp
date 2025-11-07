import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AppointmentForm from '@/components/AppointmentForm';
import { useAppContext } from '@/context/AppContext';
import { fetchAppointments, fetchPatients } from '@/utils/fakeAPI';

const Patients = () => {
  const { appointments, setAppointments, patients, setPatients } = useAppContext();
  const [activeTab, setActiveTab] = useState<'appointments' | 'history'>('appointments');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [appointmentsData, patientsData] = await Promise.all([
        fetchAppointments(),
        fetchPatients(),
      ]);
      setAppointments(appointmentsData as any);
      setPatients(patientsData as any);
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

  return (
    <div className="flex-1">
      <Navbar title="Patients" />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground border border-border hover:bg-muted'
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'history'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground border border-border hover:bg-muted'
              }`}
            >
              Medical History
            </button>
          </div>

          {activeTab === 'appointments' && (
            <button
              onClick={() => setShowAppointmentForm(true)}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Add Appointment
            </button>
          )}
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-muted rounded-xl"></div>
            ))}
          </div>
        ) : (
          <>
            {activeTab === 'appointments' && (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Patient</th>
                      <th className="text-left p-4 font-semibold text-foreground">Doctor</th>
                      <th className="text-left p-4 font-semibold text-foreground">Date</th>
                      <th className="text-left p-4 font-semibold text-foreground">Time</th>
                      <th className="text-left p-4 font-semibold text-foreground">Reason</th>
                      <th className="text-left p-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium text-foreground">{appointment.patientName}</td>
                        <td className="p-4 text-muted-foreground">{appointment.doctor}</td>
                        <td className="p-4 text-muted-foreground">{appointment.date}</td>
                        <td className="p-4 text-muted-foreground">{appointment.time}</td>
                        <td className="p-4 text-muted-foreground">{appointment.reason}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success border border-success/20">
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {patients.map(patient => (
                  <div key={patient.id} className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">{patient.name}</h3>
                    <div className="space-y-3">
                      {patient.history.map(record => (
                        <div key={record.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{record.diagnosis}</p>
                            <p className="text-sm text-muted-foreground">{record.doctor} • {record.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{record.prescription}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showAppointmentForm && (
        <AppointmentForm
          onClose={() => setShowAppointmentForm(false)}
          onSubmit={handleAddAppointment}
        />
      )}
    </div>
  );
};

export default Patients;
