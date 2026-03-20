import { useState } from "react";
import { markAttendance } from "../api/api";

export default function AttendancePage() {
  const [eventId, setEventId] = useState("");
  const [bookingCode, setBookingCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await markAttendance(eventId, bookingCode);
      setResult(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Attendance Check-in</h1>

      <div className="flex flex-col gap-3 max-w-sm">
        <input
          className="border p-2 rounded"
          placeholder="Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Booking Code"
          value={bookingCode}
          onChange={(e) => setBookingCode(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          onClick={handleCheckIn}
          disabled={loading}
        >
          {loading ? "Checking in..." : "Check In"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {result && (
        <div className="mt-4 bg-green-50 border border-green-300 p-3 rounded text-sm">
          <p className="font-semibold text-green-700">✅ {result.message}</p>
          <p>User: {result.user}</p>
          <p>Entry Time: {new Date(result.entryTime).toLocaleString()}</p>
          <p>Total Tickets Booked for this Event: <span className="font-bold">{result.totalTicketsBooked}</span></p>
        </div>
      )}
    </div>
  );
}