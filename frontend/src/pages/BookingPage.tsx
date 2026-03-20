import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking } from "../api/api";

export default function BookingPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await createBooking({ userId, eventId: eventId! });
      setResult(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="text-sm text-blue-500 mb-4 hover:underline"
        onClick={() => navigate("/")}
      >
        ← Back to Events
      </button>

      <h1 className="text-2xl font-bold mb-4">Book Ticket</h1>
      <p className="text-sm text-gray-500 mb-4 font-mono">Event ID: {eventId}</p>

      <div className="flex flex-col gap-3 max-w-sm">
        <input
          className="border p-2 rounded"
          placeholder="Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
          onClick={handleBooking}
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {result && (
        <div className="mt-4 bg-green-50 border border-green-300 p-3 rounded text-sm">
          <p className="font-semibold text-green-700">✅ Booking Confirmed!</p>
          <p>Booking ID: <span className="font-mono">{result.id}</span></p>
          <p className="mt-1">
            Booking Code:{" "}
            <span className="font-mono font-bold text-blue-700">{result.bookingCode}</span>
          </p>
          <p className="text-gray-500 text-xs mt-1">Save this code for attendance check-in.</p>
        </div>
      )}
    </div>
  );
}