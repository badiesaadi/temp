import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Staff {
  id: string;
  name: string;
  role: string;
  specialty: string;
  availability: string;
}

interface Room {
  id: string;
  number: string;
  type: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
}

interface Supply {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
}

interface Appointment {
  id: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status: string;
}

interface Patient {
  id: string;
  name: string;
  history: MedicalRecord[];
}

interface MedicalRecord {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
}

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface Feedback {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

interface AppContextType {
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  supplies: Supply[];
  setSupplies: React.Dispatch<React.SetStateAction<Supply[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  feedback: Feedback[];
  setFeedback: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  return (
    <AppContext.Provider
      value={{
        staff,
        setStaff,
        rooms,
        setRooms,
        supplies,
        setSupplies,
        appointments,
        setAppointments,
        patients,
        setPatients,
        messages,
        setMessages,
        feedback,
        setFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
