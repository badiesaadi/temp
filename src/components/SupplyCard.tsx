import { Package, Minus, Plus } from 'lucide-react';

interface SupplyCardProps {
  name: string;
  quantity: number;
  threshold: number;
  onRestock: () => void;
  onUse: () => void;
}

const SupplyCard = ({ name, quantity, threshold, onRestock, onUse }: SupplyCardProps) => {
  const isLow = quantity < threshold;
  
  return (
    <div className={`bg-card rounded-xl p-6 border ${isLow ? 'border-destructive' : 'border-border'} hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isLow ? 'bg-destructive/10' : 'bg-primary/10'}`}>
            <Package className={`w-5 h-5 ${isLow ? 'text-destructive' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">Threshold: {threshold}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-foreground">{quantity}</span>
          {isLow && (
            <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded">
              Low Stock
            </span>
          )}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${isLow ? 'bg-destructive' : 'bg-success'}`}
            style={{ width: `${Math.min((quantity / threshold) * 100, 100)}%` }}
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onUse}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
        >
          <Minus className="w-4 h-4" />
          Use
        </button>
        <button
          onClick={onRestock}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Restock
        </button>
      </div>
    </div>
  );
};

export default SupplyCard;
