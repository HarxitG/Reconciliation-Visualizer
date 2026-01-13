import axios from "axios";
import { useState } from "react";
import Dashboard from "./Dashboard.jsx";

export default function Upload() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await axios.post("http://localhost:5000/reconcile", formData);
    setResult(res.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" name="file1" required />
        <input type="file" name="file2" required />
        <button className="bg-blue-600 text-white px-4 py-2">Compare</button>
      </form>
      {result && <Dashboard data={result} />}
    </>
  );
}
