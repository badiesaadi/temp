import {
  mockStaffData,
  mockRoomsData,
  mockSuppliesData,
  mockAppointmentsData,
  mockPatientsData,
  mockMessagesData,
  mockFeedbackData,
} from './mockData';

export async function fetchStaff() {
  return new Promise((resolve) => setTimeout(() => resolve(mockStaffData), 300));
}

export async function fetchRooms() {
  return new Promise((resolve) => setTimeout(() => resolve(mockRoomsData), 300));
}

export async function fetchSupplies() {
  return new Promise((resolve) => setTimeout(() => resolve(mockSuppliesData), 300));
}

export async function fetchAppointments() {
  return new Promise((resolve) => setTimeout(() => resolve(mockAppointmentsData), 300));
}

export async function fetchPatients() {
  return new Promise((resolve) => setTimeout(() => resolve(mockPatientsData), 300));
}

export async function fetchMessages() {
  return new Promise((resolve) => setTimeout(() => resolve(mockMessagesData), 300));
}

export async function fetchFeedback() {
  return new Promise((resolve) => setTimeout(() => resolve(mockFeedbackData), 300));
}
