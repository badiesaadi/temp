interface ScheduleEntry {
  day: string;
  doctor: string;
  shift: string;
}

interface ScheduleTableProps {
  schedule: ScheduleEntry[];
}

const ScheduleTable = ({ schedule }: ScheduleTableProps) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 text-sm font-semibold text-foreground">Day</th>
            <th className="text-left p-3 text-sm font-semibold text-foreground">Morning</th>
            <th className="text-left p-3 text-sm font-semibold text-foreground">Evening</th>
            <th className="text-left p-3 text-sm font-semibold text-foreground">Night</th>
          </tr>
        </thead>
        <tbody>
          {days.map(day => {
            const daySchedule = schedule.filter(s => s.day === day);
            const morning = daySchedule.find(s => s.shift === 'Morning');
            const evening = daySchedule.find(s => s.shift === 'Evening');
            const night = daySchedule.find(s => s.shift === 'Night');
            
            return (
              <tr key={day} className="border-b border-border hover:bg-muted/50">
                <td className="p-3 font-medium text-foreground">{day}</td>
                <td className="p-3 text-sm text-muted-foreground">{morning?.doctor || '-'}</td>
                <td className="p-3 text-sm text-muted-foreground">{evening?.doctor || '-'}</td>
                <td className="p-3 text-sm text-muted-foreground">{night?.doctor || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
