import axios from 'axios';

const API_BASE_URL = 'http://localhost/med/backend';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register.php', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login.php', data),
  logout: () => api.get('/auth/logout.php'),
  getProfile: () => api.get('/auth/me.php'),
  requestReset: (email: string) => api.post('/auth/request_reset.php', { email }),
  resetPassword: (data: { email: string; code: string; new_password: string }) =>
    api.post('/auth/reset_password.php', data),
};

// Facilities API
export const facilitiesAPI = {
  create: (data: any) => api.post('/facilities/create.php', data),
  list: () => api.get('/facilities/list.php'),
  assignDoctor: (data: { facility_id: string; doctor_id: string }) =>
    api.post('/facilities/assign_doctor.php', data),
  myFacility: () => api.get('/facilities/my_facility.php'),
};

// Appointments API
export const appointmentsAPI = {
  create: (data: any) => api.post('/appointments/create.php', data),
  updateStatus: (data: { appointment_id: string; status: string }) =>
    api.post('/appointments/update_status.php', data),
  myAppointments: () => api.get('/appointments/my_appointments.php'),
  facilityAppointments: () => api.get('/appointments/facility_appointments.php'),
};

// Medical Records API
export const recordsAPI = {
  add: (data: any) => api.post('/records/add.php', data),
  clientRecords: (clientId: string) => api.get(`/records/client_records.php?client_id=${clientId}`),
};
