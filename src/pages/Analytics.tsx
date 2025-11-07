import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Navbar from '@/components/Navbar';
import ChartCard from '@/components/ChartCard';
import { mockAnalyticsData } from '@/utils/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [data, setData] = useState(mockAnalyticsData);

  const simulateSurge = () => {
    setData({
      dailyVisits: data.dailyVisits.map(v => Math.floor(v * (0.8 + Math.random() * 0.4))),
      staffAvailability: {
        available: Math.floor(Math.random() * 5),
        busy: Math.floor(Math.random() * 3),
        off: Math.floor(Math.random() * 2),
      },
      roomOccupancy: {
        occupied: Math.floor(Math.random() * 4),
        available: Math.floor(Math.random() * 3),
        cleaning: Math.floor(Math.random() * 2),
        maintenance: Math.floor(Math.random() * 2),
      },
      suppliesStock: data.suppliesStock,
    });
  };

  const staffPieData = {
    labels: ['Available', 'Busy', 'Off'],
    datasets: [{
      data: [data.staffAvailability.available, data.staffAvailability.busy, data.staffAvailability.off],
      backgroundColor: ['hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(210, 20%, 75%)'],
    }],
  };

  const roomBarData = {
    labels: ['Occupied', 'Available', 'Cleaning', 'Maintenance'],
    datasets: [{
      label: 'Rooms',
      data: [data.roomOccupancy.occupied, data.roomOccupancy.available, data.roomOccupancy.cleaning, data.roomOccupancy.maintenance],
      backgroundColor: ['hsl(0, 84%, 60%)', 'hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(217, 91%, 60%)'],
      borderRadius: 8,
    }],
  };

  const suppliesLineData = {
    labels: data.suppliesStock.dates,
    datasets: [
      {
        label: 'Syringes',
        data: data.suppliesStock.syringes,
        borderColor: 'hsl(174, 72%, 41%)',
        backgroundColor: 'hsla(174, 72%, 41%, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Gloves',
        data: data.suppliesStock.gloves,
        borderColor: 'hsl(217, 91%, 60%)',
        backgroundColor: 'hsla(217, 91%, 60%, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Masks',
        data: data.suppliesStock.masks,
        borderColor: 'hsl(142, 71%, 45%)',
        backgroundColor: 'hsla(142, 71%, 45%, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const feedbackDoughnutData = {
    labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    datasets: [{
      data: [65, 25, 7, 2, 1],
      backgroundColor: [
        'hsl(142, 71%, 45%)',
        'hsl(174, 72%, 41%)',
        'hsl(38, 92%, 50%)',
        'hsl(217, 91%, 60%)',
        'hsl(0, 84%, 60%)',
      ],
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
  };

  return (
    <div className="flex-1">
      <Navbar title="Analytics" />
      
      <div className="p-6 space-y-6">
        <div className="flex justify-end">
          <button
            onClick={simulateSurge}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-5 h-5" />
            Simulate Surge
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Staff Availability">
            <Pie data={staffPieData} options={chartOptions} />
          </ChartCard>

          <ChartCard title="Room Occupancy">
            <Bar data={roomBarData} options={chartOptions} />
          </ChartCard>

          <ChartCard title="Supplies Stock Levels">
            <Line data={suppliesLineData} options={chartOptions} />
          </ChartCard>

          <ChartCard title="Patient Feedback Distribution">
            <Doughnut data={feedbackDoughnutData} options={chartOptions} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
