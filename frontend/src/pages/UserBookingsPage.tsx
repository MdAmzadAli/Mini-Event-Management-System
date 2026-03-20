import { useState } from "react";
import { getUserBookings } from "../api/api";

export default function UserBookingsPage() {
  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setError("");
    setBookings([]);
    setLoading(true);
    setSearched(true);
    try {
      const res = await getUserBookings(userId);
      setBookings(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      <div className="flex gap-2 max-w-sm mb-6">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {searched && bookings.length === 0 && !loading && !error && (
        <p className="text-gray-400">No bookings found for this user.</p>
      )}

      <div className="flex flex-col gap-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="border rounded p-4">
            <p className="font-semibold">{booking.event.title}</p>
            <p className="text-sm text-gray-500">
              {new Date(booking.event.date).toLocaleString()}
            </p>
            <p className="text-sm mt-1">
              Booking Code:{" "}
              <span className="font-mono text-blue-700">{booking.bookingCode}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Booked on: {new Date(booking.bookingDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}