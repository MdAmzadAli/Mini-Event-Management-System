import { useState } from "react";
import { createUser } from "../api/api";

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await createUser({ name, email });
      setResult(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create User</h1>

      <div className="flex flex-col gap-3 max-w-sm">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {result && (
        <div className="mt-4 bg-green-50 border border-green-300 p-3 rounded text-sm">
          <p className="font-semibold text-green-700">✅ User Created!</p>
          <p>ID: <span className="font-mono">{result.id}</span></p>
          <p>Name: {result.name}</p>
          <p>Email: {result.email}</p>
          <p className="text-gray-500 text-xs mt-1">Save this ID to make bookings.</p>
        </div>
      )}
    </div>
  );
}