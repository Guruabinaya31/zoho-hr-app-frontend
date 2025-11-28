import { useEffect, useState } from "react";
import { getForm } from "../api/forms";
import FormRender from "../builder/FormRender";

const TestForm = ({ formName }) => {
  const [schemaJson, setSchemaJson] = useState("");

  useEffect(() => {
    let mounted = true;
    getForm(formName)
      .then((f) => {
        // formRender expects JSON string or array-based formData
        const data =
          f?.schema?.fields && Array.isArray(f.schema.fields)
            ? JSON.stringify(f.schema.fields)
            : JSON.stringify(f.schema || []);
        if (mounted) setSchemaJson(data);
      })
      .catch((err) => {
        console.error(err);
        setSchemaJson("");
      });

    return () => (mounted = false);
  }, [formName]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Test Form — {formName}</h2>

      <div className="bg-white p-6 rounded-lg shadow">
        {!schemaJson ? (
          <div className="text-sm text-gray-500">No schema to render.</div>
        ) : (
          <FormRender json={schemaJson} />
        )}
      </div>
    </div>
  );
};

export default TestForm;
