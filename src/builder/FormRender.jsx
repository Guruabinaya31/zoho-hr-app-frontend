import $ from "jquery";
import { useEffect, useRef } from "react";
require("formBuilder/dist/form-render.min.js");

const FormRender = ({ json }) => {
  const fr = useRef(null);

  useEffect(() => {
    if (!json || !fr.current) return;

    fr.current.innerHTML = "";
    try {
      $(fr.current).formRender({ formData: json });
    } catch (e) {
      console.error("Render failed", e);
    }
  }, [json]);

  return <div ref={fr} className="render-area" />;
};

export default FormRender;
