import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { getForm, updateForm } from "../api/forms";

/* jQuery & formBuilder */
window.jQuery = $;
window.$ = $;
require("jquery-ui-dist/jquery-ui"); // sortable & ui if required
require("formBuilder"); 

const EditSchema = ({ formName }) => {
  const fb = useRef(null);
  const builderInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getForm(formName)
      .then((res) => {
        if (!mounted) return;
        // formBuilder expects formData either as JSON string or array
        const data =
          res?.schema?.fields && Array.isArray(res.schema.fields)
            ? JSON.stringify(res.schema.fields)
            : JSON.stringify(res.schema || []);
        // delay init until DOM node exists
        setTimeout(() => {
          if (fb.current && !builderInstance.current) {
            builderInstance.current = $(fb.current).formBuilder({
              formData: data,
              disableFields: [],
              disabledActionButtons: ["data", "save", "clear"],
              // you can add more config here
            });
          } else if (builderInstance.current) {
            // reload data
            try {
              builderInstance.current.actions.setData(data);
            } catch (e) {
              // ignore
            }
          }
        }, 50);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load form schema");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [formName]);

  // re-init on unmount/mount in case formName changes
  useEffect(() => {
    return () => {
      if (builderInstance.current) {
        try {
          builderInstance.current.actions.destroy();
        } catch (e) {
          // ignore
        }
        builderInstance.current = null;
      }
    };
  }, [formName]);

  const saveSchema = async () => {
    if (!builderInstance.current) return;
    try {
      const json = builderInstance.current.actions.getData("json");
      const parsed = JSON.parse(json);
      // Some backends expect { fields: [...] } shape
      await updateForm(formName, { schema: { fields: parsed } });
      setSavedAt(new Date().toLocaleString());
      alert("Schema updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to save schema");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <h2 className="text-xl font-semibold text-center">Edit Schema — {formName}</h2>
        <div className="text-sm text-gray-500">
          {loading ? "Loading..." : savedAt ? `Saved: ${savedAt}` : ""}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div
          ref={fb}
          className="min-h-[320px] border border-dashed border-gray-200 rounded-md p-3"
        />
      </div>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={saveSchema}
        >
          Save Schema
        </button>

        <button
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => {
            if (builderInstance.current) builderInstance.current.actions.clearFields();
          }}
        >
          Clear Builder
        </button>
      </div>
    </div>
  );
};

export default EditSchema;
