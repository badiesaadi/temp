import { useEffect, useState } from 'react';
import { Users, Building2, Calendar, Star } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import ChartCard from '@/components/ChartCard';
import { useAppContext } from '@/context/AppContext';
import { fetchStaff, fetchRooms, fetchAppointments, fetchFeedback } from '@/utils/fakeAPI';
import { mockAnalyticsData } from '@/utils/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { staff, setStaff, rooms, setRooms, appointments, setAppointments, feedback, setFeedback } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [staffData, roomsData, appointmentsData, feedbackData] = await Promise.all([
        fetchStaff(),
        fetchRooms(),
        fetchAppointments(),
        fetchFeedback(),
      ]);
      setStaff(staffData as any);
      setRooms(roomsData as any);
      setAppointments(appointmentsData as any);
      setFeedback(feedbackData as any);
      setLoading(false);
    };
    loadData();
  }, []);

  const activeStaff = staff.filter(s => s.availability === 'Available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const roomOccupancyPercent = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;
  const avgFeedback = feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : '0';

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Patient Visits',
        data: mockAnalyticsData.dailyVisits,
        backgroundColor: 'hsl(174, 72%, 41%)',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  if (loading) {
    return (
      <div className="flex-1">
        <Navbar title="Dashboard" />
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-muted rounded-xl"></div>
            <div className="h-32 bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Navbar title="Dashboard" />
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            title="Active Staff"
            value={activeStaff}
            icon={Users}
            color="primary"
            trend="+2 today"
          />
          <Card
            title="Room Occupancy"
            value={`${roomOccupancyPercent}%`}
            icon={Building2}
            color="secondary"
          />
          <Card
            title="Upcoming Appointments"
            value={appointments.length}
            icon={Calendar}
            color="success"
          />
          <Card
            title="Avg Feedback Score"
            value={avgFeedback}
            icon={Star}
            color="warning"
          />
        </div>

        <ChartCard title="Daily Patient Visits">
          <Bar data={chartData} options={chartOptions} />
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;
