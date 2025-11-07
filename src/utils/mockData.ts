export const mockStaffData = [
  { id: '1', name: 'Dr. Amine Haddad', role: 'Doctor', specialty: 'Cardiology', availability: 'Available' },
  { id: '2', name: 'Dr. Sara Benali', role: 'Doctor', specialty: 'Neurology', availability: 'Available' },
  { id: '3', name: 'Nurse Fatima Zohra', role: 'Nurse', specialty: 'Emergency Care', availability: 'Busy' },
  { id: '4', name: 'Nurse Karim Mansouri', role: 'Nurse', specialty: 'Pediatrics', availability: 'Available' },
  { id: '5', name: 'Ahmed Berrada', role: 'Admin', specialty: 'Operations', availability: 'Available' },
];

export const mockRoomsData = [
  { id: '1', number: '101', type: 'ICU', status: 'Occupied' as const },
  { id: '2', number: '102', type: 'ICU', status: 'Available' as const },
  { id: '3', number: '201', type: 'Surgery', status: 'Cleaning' as const },
  { id: '4', number: '301', type: 'General', status: 'Available' as const },
  { id: '5', number: '302', type: 'General', status: 'Maintenance' as const },
];

export const mockSuppliesData = [
  { id: '1', name: 'Syringes', quantity: 450, threshold: 200 },
  { id: '2', name: 'Gloves', quantity: 180, threshold: 300 },
  { id: '3', name: 'Masks', quantity: 890, threshold: 500 },
  { id: '4', name: 'IV Bags', quantity: 120, threshold: 150 },
  { id: '5', name: 'Bandages', quantity: 350, threshold: 200 },
  { id: '6', name: 'Antiseptic', quantity: 95, threshold: 100 },
];

export const mockAppointmentsData = [
  { id: '1', patientName: 'Youssef Alami', doctor: 'Dr. Amine Haddad', date: '2025-11-08', time: '09:00', reason: 'Checkup', status: 'Scheduled' },
  { id: '2', patientName: 'Leila Boukhari', doctor: 'Dr. Sara Benali', date: '2025-11-08', time: '10:30', reason: 'Consultation', status: 'Scheduled' },
  { id: '3', patientName: 'Hassan Idrissi', doctor: 'Dr. Amine Haddad', date: '2025-11-09', time: '14:00', reason: 'Follow-up', status: 'Scheduled' },
  { id: '4', patientName: 'Amina Tazi', doctor: 'Dr. Sara Benali', date: '2025-11-10', time: '11:00', reason: 'Treatment', status: 'Scheduled' },
];

export const mockPatientsData = [
  {
    id: '1',
    name: 'Youssef Alami',
    history: [
      { id: 'h1', date: '2025-10-15', doctor: 'Dr. Amine Haddad', diagnosis: 'Hypertension', prescription: 'Lisinopril 10mg' },
      { id: 'h2', date: '2025-09-20', doctor: 'Dr. Amine Haddad', diagnosis: 'Annual Checkup', prescription: 'None' },
    ]
  },
  {
    id: '2',
    name: 'Leila Boukhari',
    history: [
      { id: 'h3', date: '2025-10-22', doctor: 'Dr. Sara Benali', diagnosis: 'Migraine', prescription: 'Sumatriptan 50mg' },
    ]
  },
  {
    id: '3',
    name: 'Hassan Idrissi',
    history: [
      { id: 'h4', date: '2025-11-01', doctor: 'Dr. Amine Haddad', diagnosis: 'Diabetes Type 2', prescription: 'Metformin 500mg' },
    ]
  },
  {
    id: '4',
    name: 'Amina Tazi',
    history: [
      { id: 'h5', date: '2025-10-18', doctor: 'Dr. Sara Benali', diagnosis: 'Anxiety', prescription: 'Sertraline 25mg' },
    ]
  },
];

export const mockMessagesData = [
  { id: '1', sender: 'Doctor', text: 'Good morning! How are you feeling today?', timestamp: '09:00' },
  { id: '2', sender: 'Patient', text: 'Much better, thank you. The medication is working well.', timestamp: '09:05' },
  { id: '3', sender: 'Doctor', text: 'Great to hear! Continue with the same dosage for another week.', timestamp: '09:07' },
];

export const mockFeedbackData = [
  { id: '1', patientName: 'Youssef Alami', rating: 5, comment: 'Excellent care and service!', date: '2025-11-05' },
  { id: '2', patientName: 'Leila Boukhari', rating: 4, comment: 'Very professional staff.', date: '2025-11-04' },
  { id: '3', patientName: 'Hassan Idrissi', rating: 5, comment: 'Outstanding treatment and facilities.', date: '2025-11-03' },
];

export const mockAnalyticsData = {
  dailyVisits: [45, 52, 48, 61, 55, 58, 63],
  staffAvailability: { available: 4, busy: 1, off: 0 },
  roomOccupancy: { occupied: 2, available: 2, cleaning: 1, maintenance: 1 },
  suppliesStock: {
    dates: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    syringes: [500, 475, 460, 450],
    gloves: [350, 280, 220, 180],
    masks: [950, 920, 905, 890],
  }
};
