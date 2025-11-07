import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import RoomCard from '@/components/RoomCard';
import SupplyCard from '@/components/SupplyCard';
import { useAppContext } from '@/context/AppContext';
import { fetchRooms, fetchSupplies } from '@/utils/fakeAPI';

const RoomsSupplies = () => {
  const { rooms, setRooms, supplies, setSupplies } = useAppContext();
  const [activeTab, setActiveTab] = useState<'rooms' | 'supplies'>('rooms');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [roomsData, suppliesData] = await Promise.all([
        fetchRooms(),
        fetchSupplies(),
      ]);
      setRooms(roomsData as any);
      setSupplies(suppliesData as any);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredRooms = filterStatus === 'All' ? rooms : rooms.filter(r => r.status === filterStatus);

  const handleRestock = (id: string) => {
    setSupplies(supplies.map(s => s.id === id ? { ...s, quantity: s.quantity + 100 } : s));
  };

  const handleUse = (id: string) => {
    setSupplies(supplies.map(s => s.id === id ? { ...s, quantity: Math.max(0, s.quantity - 10) } : s));
  };

  return (
    <div className="flex-1">
      <Navbar title="Rooms & Supplies" />
      
      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'rooms'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground border border-border hover:bg-muted'
            }`}
          >
            Rooms
          </button>
          <button
            onClick={() => setActiveTab('supplies')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'supplies'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground border border-border hover:bg-muted'
            }`}
          >
            Supplies
          </button>
        </div>

        {activeTab === 'rooms' && (
          <>
            <div className="flex gap-2 mb-6">
              {['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-card text-foreground border border-border hover:bg-muted'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-40 bg-muted rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRooms.map(room => (
                  <RoomCard key={room.id} {...room} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'supplies' && (
          <>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-52 bg-muted rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supplies.map(supply => (
                  <SupplyCard
                    key={supply.id}
                    {...supply}
                    onRestock={() => handleRestock(supply.id)}
                    onUse={() => handleUse(supply.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RoomsSupplies;
