import api from "./axios";

export const createUser = (data: { name: string; email: string }) =>
  api.post("/users", data);

export const getUserBookings = (userId: string) =>
  api.get(`/users/${userId}/bookings`);

export const getAllEvents = () => api.get("/events");

export const createEvent = (data: {
  title: string;
  description?: string;
  date: string;
  totalCapacity: number;
}) => api.post("/events", data);

export const createBooking = (data: { userId: string; eventId: string }) =>
  api.post("/bookings", data);

export const markAttendance = (eventId: string, bookingCode: string) =>
  api.post(`/events/${eventId}/attendance`, { bookingCode });