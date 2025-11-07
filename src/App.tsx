import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import MedStaff from "./pages/MedStaff";
import RoomsSupplies from "./pages/RoomsSupplies";
import Patients from "./pages/Patients";
import Analytics from "./pages/Analytics";
import Chat from "./pages/Chat";
import Appointments from "./pages/Appointments";
import Records from "./pages/Records";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import BedManagement from "./pages/BedManagement";
import ORScheduling from "./pages/ORScheduling";
import Government from "./pages/Government";
import SpecialistSearch from "./pages/SpecialistSearch";
import HelpCenter from "./pages/HelpCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Dashboard Routes with Sidebar Layout */}
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/staff" element={<MedStaff />} />
              <Route path="/rooms" element={<RoomsSupplies />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/beds" element={<BedManagement />} />
              <Route path="/or-scheduling" element={<ORScheduling />} />
              <Route path="/government" element={<Government />} />
            </Route>
            
            {/* Patient App Routes (no sidebar) */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/records" element={<Records />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/specialist-search" element={<SpecialistSearch />} />
            <Route path="/help" element={<HelpCenter />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
