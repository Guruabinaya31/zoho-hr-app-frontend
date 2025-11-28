import { useState } from "react";
import { createForm } from "../api/forms";

const CreateForm = ({ refresh }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async () => {
    if (!name.trim()) return alert("Enter a form name");
    setLoading(true);
    try {
      await createForm(name.trim());
      setName("");
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Create New Form</h2>
      <div className="space-y-2">
        <input
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Form name"
        />
        <div className="flex gap-2">
          <button
            onClick={create}
            className="flex-1 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
          <button
            onClick={() => setName("")}
            className="py-2 px-3 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
