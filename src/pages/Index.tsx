import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Users, Activity, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">MedOptima</h1>
              <p className="text-xs text-muted-foreground">National Healthcare Platform</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Contact Support</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Connected Healthcare Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unifying hospitals, health centers, and the Ministry of Health across Algeria
            for better patient care and resource management.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Hospital Portal */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary cursor-pointer group">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Hospital Portal</h3>
                <p className="text-muted-foreground mb-6">
                  Manage hospital operations, staff, patients, and resources efficiently.
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Staff & Duty Scheduling</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Bed Management & Patient Flow</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Operating Room Scheduling</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Inventory & Supply Management</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={() => navigate('/dashboard')}
                className="w-full group-hover:shadow-lg transition-shadow"
                size="lg"
              >
                Access Hospital Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Government Portal */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary cursor-pointer group">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Ministry Dashboard</h3>
                <p className="text-muted-foreground mb-6">
                  Monitor national healthcare network and coordinate resources.
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>National Hospital Network Status</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Resource Request Management</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Occupancy & Staff Analytics</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Critical Request Monitoring</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={() => navigate('/government')}
                className="w-full group-hover:shadow-lg transition-shadow"
                size="lg"
                variant="secondary"
              >
                Access Ministry Portal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Platform Capabilities</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Staff Management</h4>
              <p className="text-sm text-muted-foreground">Automated scheduling and duty allocation</p>
            </Card>
            <Card className="p-6 text-center">
              <Activity className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Real-time Analytics</h4>
              <p className="text-sm text-muted-foreground">Live KPIs and performance metrics</p>
            </Card>
            <Card className="p-6 text-center">
              <Building2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Resource Coordination</h4>
              <p className="text-sm text-muted-foreground">Inter-hospital resource sharing</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Secure Platform</h4>
              <p className="text-sm text-muted-foreground">Role-based access control</p>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 MedOptima - National Connected Healthcare Platform | Ministry of Health, Algeria</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
