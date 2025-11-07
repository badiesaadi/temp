import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, UserCircle, BarChart3, Bed, Calendar, Building } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Med Staff', path: '/staff', icon: Users },
    { name: 'Rooms & Supplies', path: '/rooms', icon: Building2 },
    { name: 'Patients', path: '/patients', icon: UserCircle },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Bed Management', path: '/beds', icon: Bed },
    { name: 'OR Scheduling', path: '/or-scheduling', icon: Calendar },
    { name: 'Ministry Dashboard', path: '/government', icon: Building },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-primary">MedOptima</h1>
        <p className="text-sm text-sidebar-foreground/70">Hospital Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
