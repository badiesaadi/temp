import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Dashboard Routes with Sidebar */}
            <Route path="/" element={
              <div className="flex min-h-screen w-full">
                <Sidebar />
                <Dashboard />
              </div>
            } />
            <Route path="/staff" element={
              <div className="flex min-h-screen w-full">
                <Sidebar />
                <MedStaff />
              </div>
            } />
            <Route path="/rooms" element={
              <div className="flex min-h-screen w-full">
                <Sidebar />
                <RoomsSupplies />
              </div>
            } />
            <Route path="/patients" element={
              <div className="flex min-h-screen w-full">
                <Sidebar />
                <Patients />
              </div>
            } />
            <Route path="/analytics" element={
              <div className="flex min-h-screen w-full">
                <Sidebar />
                <Analytics />
              </div>
            } />
            
            {/* Patient App Routes (no sidebar) */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/records" element={<Records />} />
            <Route path="/feedback" element={<Feedback />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
