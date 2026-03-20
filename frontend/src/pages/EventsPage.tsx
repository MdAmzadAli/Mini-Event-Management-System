import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEvents, createEvent } from "../api/api";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // create event form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [createError, setCreateError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getAllEvents();
      setEvents(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    setCreateError("");
    setCreateLoading(true);
    try {
      await createEvent({
        title,
        description,
        date,
        totalCapacity: Number(capacity),
      });
      setTitle("");
      setDescription("");
      setDate("");
      setCapacity("");
      fetchEvents();
    } catch (err: any) {
      setCreateError(err.response?.data?.error || "Failed to create event");
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      {/* Create Event Form */}
      <div className="border rounded p-4 mb-6 bg-gray-50">
        <h2 className="font-semibold mb-3">Create New Event</h2>
        <div className="flex flex-col gap-2 max-w-sm">
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Total Capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            onClick={handleCreateEvent}
            disabled={createLoading}
          >
            {createLoading ? "Creating..." : "Create Event"}
          </button>
          {createError && <p className="text-red-500 text-sm">{createError}</p>}
        </div>
      </div>

      {/* Events List */}
      {loading && <p className="text-gray-500">Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-3">
        {events.length === 0 && !loading && (
          <p className="text-gray-400">No upcoming events.</p>
        )}
        {events.map((event) => (
          <div key={event.id} className="border rounded p-4 flex justify-between items-start">
            <div>
              <p className="font-semibold">{event.title}</p>
              {event.description && (
                <p className="text-sm text-gray-500">{event.description}</p>
              )}
              <p className="text-sm text-gray-400">
                {new Date(event.date).toLocaleString()}
              </p>
              <p className="text-sm mt-1">
                Tickets left:{" "}
                <span className={event.remainingTickets === 0 ? "text-red-500" : "text-green-600"}>
                  {event.remainingTickets}
                </span>
                /{event.totalCapacity}
              </p>
            </div>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
              disabled={event.remainingTickets === 0}
              onClick={() => navigate(`/book/${event.id}`)}
            >
              {event.remainingTickets === 0 ? "Sold Out" : "Book Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}