import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { generateScheduleAsync } from '@/utils/scheduleGenerator';
import ScheduleTable from './ScheduleTable';

interface Staff {
  id: string;
  name: string;
  role: string;
  specialty: string;
  availability: string;
}

interface ScheduleEntry {
  day: string;
  doctor: string;
  shift: string;
}

interface ScheduleModalProps {
  staff: Staff[];
  onClose: () => void;
}

const ScheduleModal = ({ staff, onClose }: ScheduleModalProps) => {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const generated = await generateScheduleAsync(staff);
    setSchedule(generated);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Schedule Generator</h2>
            <p className="text-sm text-muted-foreground">Generate optimized staff schedules for the week</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!schedule.length && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">Click the button below to generate a schedule using AI</p>
              <button
                onClick={handleGenerate}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Generate Schedule
              </button>
            </div>
          )}
          
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-foreground">Generating schedule...</span>
            </div>
          )}
          
          {schedule.length > 0 && !loading && (
            <ScheduleTable schedule={schedule} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
