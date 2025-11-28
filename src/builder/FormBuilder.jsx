import $ from "jquery";
import { useEffect, useRef } from "react";

window.jQuery = $;
window.$ = $;
require("jquery-ui-dist/jquery-ui");
require("formBuilder");

const FormBuilder = ({ initialData = "[]", onSave }) => {
  const fb = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    if (fb.current && !instance.current) {
      instance.current = $(fb.current).formBuilder({
        formData: initialData,
        disabledActionButtons: ["data", "clear"],
      });
    }

    return () => {
      if (instance.current) {
        try {
          instance.current.actions.destroy();
        } catch (e) {
          // ignore
        }
        instance.current = null;
      }
    };
  }, []);

  const save = () => {
    if (!instance.current) return;
    const data = instance.current.actions.getData("json");
    if (typeof onSave === "function") onSave(data);
  };

  return (
    <div>
      <div ref={fb} className="min-h-[240px] border border-dashed border-gray-200 rounded-md p-2 bg-white" />
      <div className="mt-3">
        <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Save
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
