import { useEffect, useState } from "react";
import { getForm, updateForm } from "../api/forms";

const EditOutput = ({ formName }) => {
  const [schemaFields, setSchemaFields] = useState([]); // [{name, label}, ...]
  const [output, setOutput] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getForm(formName)
      .then((f) => {
        const fields =
          (f?.schema?.fields && Array.isArray(f.schema.fields)
            ? f.schema.fields
            : Array.isArray(f.schema)
            ? f.schema
            : []
          ).map((fld) => ({
            label: fld.label || fld.name || fld.type || "unnamed",
            name : fld.name || fld.label || fld.type || "unnamed",
          }));
        setSchemaFields(fields);
        setOutput(f.output || {});
      })
      .catch((err) => {
        console.error(err);
        setSchemaFields([]);
        setOutput({});
      })
      .finally(() => setLoading(false));
  }, [formName]);

  const handleChange = (outputKey, schemaName) => {
    setOutput((prev) => ({ ...prev, [outputKey]: schemaName }));
  };

  const saveOutput = async () => {
    setSaving(true);
    try {
      await updateForm(formName, { output });
      alert("Output mapping saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;

  const schemaOptions = [
    { value: "", label: "— Not mapped —" },
    ...schemaFields.map((s) => ({ value: s.name, label: s.label })),
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4 item-center justify-ce">
      <h2 className="text-xl font-semibold text-center">Field Mapping — {formName}</h2>

      <div className="bg-white shadow rounded-lg divide-y border">
        <div className="flex px-4 py-3 text-sm font-medium text-gray-700">
          <div className="w-2/5">Output Field</div>
          <div className="w-3/5">Mapped Schema Field</div>
        </div>

        <div>
          {Object.keys(output).length === 0 && (
            <div className="p-4 text-sm text-gray-500">No output fields defined.</div>
          )}

          {Object.keys(output).map((key) => (
            <div key={key} className="flex items-center px-4 py-3 text-sm">
              <div className="w-2/5 text-gray-800">{key}</div>

              <div className="w-3/5">
                <select
                  value={output[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none"
                >
                  {schemaOptions.map((opt) => (
                    <option key={opt.value} value={opt.name}>
                      {opt.label} {opt.value ? `(${opt.value})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={saveOutput}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Mapping"}
        </button>

        <button
          onClick={() => {
            // reset mapping to default (empty)
            const cleared = Object.keys(output).reduce((acc, k) => {
              acc[k] = "";
              return acc;
            }, {});
            setOutput(cleared);
          }}
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default EditOutput;

