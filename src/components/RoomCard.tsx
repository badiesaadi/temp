import { Building2 } from 'lucide-react';

interface RoomCardProps {
  number: string;
  type: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
}

const RoomCard = ({ number, type, status }: RoomCardProps) => {
  const statusColors = {
    Available: 'bg-success/10 text-success border-success/20',
    Occupied: 'bg-destructive/10 text-destructive border-destructive/20',
    Cleaning: 'bg-warning/10 text-warning border-warning/20',
    Maintenance: 'bg-secondary/10 text-secondary border-secondary/20',
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Room {number}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm font-medium border inline-block ${statusColors[status]}`}>
        {status}
      </div>
    </div>
  );
};

export default RoomCard;
