import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Activity, Calendar, FileText, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getLinks = () => {
    switch (user?.role) {
      case 'client':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/appointments', icon: Calendar, label: 'Appointments' },
          { to: '/records', icon: FileText, label: 'Medical Records' },
        ];
      case 'doctor':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/appointments', icon: Calendar, label: 'Appointments' },
          { to: '/patients', icon: Activity, label: 'Patients' },
          { to: '/records', icon: FileText, label: 'Records' },
        ];
      case 'admin':
        return [
          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/staff', icon: Users, label: 'Staff' },
          { to: '/appointments', icon: Calendar, label: 'Appointments' },
          { to: '/rooms', icon: Building2, label: 'Facilities' },
          { to: '/analytics', icon: Activity, label: 'Analytics' },
        ];
      case 'general_admin':
        return [
          { to: '/dashboard', icon: Building2, label: 'Ministry Dashboard' },
          { to: '/facilities', icon: Building2, label: 'Facilities' },
          { to: '/analytics', icon: Activity, label: 'National Analytics' },
        ];
      default:
        return [];
    }
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">MedConnect</h1>
        <p className="text-xs text-muted-foreground mt-1">Healthcare Platform</p>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {getLinks().map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-accent"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
