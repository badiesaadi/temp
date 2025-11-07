import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShieldX } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        <ShieldX className="w-16 h-16 text-destructive mx-auto" />
        <div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}
