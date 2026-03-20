import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import BookingPage from "./pages/BookingPage";
import UserBookingsPage from "./pages/UserBookingsPage";
import AttendancePage from "./pages/AttendancePage";
import CreateUserPage from "./pages/CreateUserPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-900 text-white px-6 py-3 flex gap-6 text-sm">
        <span className="font-bold text-lg mr-4">🎟️ EMS</span>
        <Link to="/" className="hover:text-gray-300">Events</Link>
        <Link to="/create-user" className="hover:text-gray-300">Create User</Link>
        <Link to="/my-bookings" className="hover:text-gray-300">My Bookings</Link>
        <Link to="/attendance" className="hover:text-gray-300">Attendance</Link>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/book/:eventId" element={<BookingPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/my-bookings" element={<UserBookingsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}