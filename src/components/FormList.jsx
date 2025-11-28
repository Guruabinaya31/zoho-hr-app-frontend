import { useEffect, useState } from "react";
import { listForms } from "../api/forms";

const FormList = ({ onSelect }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    listForms()
      .then((res) => {
        if (mounted) setForms(res);
      })
      .catch((err) => {
        console.error(err);
        setForms([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">All Forms</h2>

      {loading && <div className="text-sm text-gray-500">Loading...</div>}

      <div className="space-y-2 mt-2">
        {forms.length === 0 && !loading && (
          <div className="text-sm text-gray-500">No forms yet</div>
        )}

        {forms.map((f) => (
          <div
            key={f}
            onClick={() => onSelect(f)}
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-md px-3 py-2 hover:bg-blue-50"
          >
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">{f}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormList;
