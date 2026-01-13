import axios from "axios";
import { useState } from "react";
import Dashboard from "./Dashboard.jsx";

// ✅ Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL;

export default function Upload() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const res = await axios.post(
        `${API_URL}/reconcile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (error) {
      console.error("Reconciliation failed:", error);
      alert("Error while reconciling files");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" name="file1" required />
        <input type="file" name="file2" required />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Compare
        </button>
      </form>

      {result && <Dashboard data={result} />}
    </>
  );
}
