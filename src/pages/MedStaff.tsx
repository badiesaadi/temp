import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ScheduleModal from '@/components/ScheduleModal';
import { useAppContext } from '@/context/AppContext';
import { fetchStaff } from '@/utils/fakeAPI';

const MedStaff = () => {
  const { staff, setStaff } = useAppContext();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [filterRole, setFilterRole] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const staffData = await fetchStaff();
      setStaff(staffData as any);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredStaff = filterRole === 'All' ? staff : staff.filter(s => s.role === filterRole);

  const availabilityColors = {
    Available: 'bg-success/10 text-success border-success/20',
    Busy: 'bg-warning/10 text-warning border-warning/20',
    Off: 'bg-muted text-muted-foreground border-border',
  };

  return (
    <div className="flex-1">
      <Navbar title="Medical Staff" />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {['All', 'Doctor', 'Nurse', 'Admin'].map(role => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterRole === role
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border hover:bg-muted'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-5 h-5" />
            Generate AI Schedule
          </button>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-muted rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Name</th>
                  <th className="text-left p-4 font-semibold text-foreground">Role</th>
                  <th className="text-left p-4 font-semibold text-foreground">Specialty</th>
                  <th className="text-left p-4 font-semibold text-foreground">Availability</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map(member => (
                  <tr key={member.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{member.name}</td>
                    <td className="p-4 text-muted-foreground">{member.role}</td>
                    <td className="p-4 text-muted-foreground">{member.specialty}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border inline-block ${
                        availabilityColors[member.availability as keyof typeof availabilityColors]
                      }`}>
                        {member.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showScheduleModal && (
        <ScheduleModal staff={staff} onClose={() => setShowScheduleModal(false)} />
      )}
    </div>
  );
};

export default MedStaff;
