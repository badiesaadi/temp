import { useEffect, useState } from 'react';
import { FileText, Calendar, User } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { fetchPatients } from '@/utils/fakeAPI';

const Records = () => {
  const { patients, setPatients } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData as any);
      setLoading(false);
    };
    loadData();
  }, []);

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

  // Show first patient's records for demo
  const currentPatient = patients[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 space-y-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Medical Records</h1>
          <p className="text-muted-foreground">{currentPatient?.name}</p>
        </div>

        {currentPatient?.history.map(record => (
          <div key={record.id} className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{record.diagnosis}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{record.prescription}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{record.doctor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{record.date}</span>
              </div>
            </div>
          </div>
        ))}

        <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Request New Records
        </button>
      </div>
    </div>
  );
};

export default Records;
