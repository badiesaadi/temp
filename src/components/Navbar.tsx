import { Bell, Search, Home, Calendar, MessageCircle, FileText, Star, Search as SearchIcon, HelpCircle } from 'lucide-react';

interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const navItemClass = "flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors";
  
  return (
    <>
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            A
          </div>
        </div>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 flex items-center justify-around px-2 md:hidden z-50">
        <a href="/chat" className={navItemClass}>
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </a>
        <a href="/appointments" className={navItemClass}>
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Appointments</span>
        </a>
        <a href="/records" className={navItemClass}>
          <FileText className="w-5 h-5" />
          <span className="text-xs">Records</span>
        </a>
        <a href="/feedback" className={navItemClass}>
          <Star className="w-5 h-5" />
          <span className="text-xs">Feedback</span>
        </a>
        <a href="/specialist-search" className={navItemClass}>
          <SearchIcon className="w-5 h-5" />
          <span className="text-xs">Specialists</span>
        </a>
        <a href="/help" className={navItemClass}>
          <HelpCircle className="w-5 h-5" />
          <span className="text-xs">Help</span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
