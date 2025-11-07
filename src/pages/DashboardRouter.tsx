import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import ClientDashboard from './ClientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';
import MinistryDashboard from './MinistryDashboard';

export default function DashboardRouter() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'client':
      return <ClientDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'general_admin':
      return <MinistryDashboard />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
}
