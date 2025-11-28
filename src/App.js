import { useState } from "react";
import FormList from "./components/FormList";
import CreateForm from "./components/CreateForm";
import EditSchema from "./components/EditSchema";
import EditOutput from "./components/EditOutput";
import PreviewQR from "./components/PreviewQR";
import TestForm from "./components/TestForm";

function App() {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("schema");
  const [reload, setReload] = useState(false);

  const refresh = () => setReload(!reload);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-80 bg-white shadow-lg p-6 overflow-y-auto border-r border-gray-200">

        <h1 className="text-2xl font-semibold mb-4">Form Manager</h1>

        <CreateForm refresh={refresh} />

        <FormList
          key={reload}
          onSelect={(formName) => {
            setSelected(formName);
            setView("schema");
          }}
        />

        {selected && (
          <div className="mt-6 space-y-2">
            <button
              onClick={() => setView("schema")}
              className={`w-full py-2 px-4 rounded-lg text-center ${
                view === "schema"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Edit Schema
            </button>

            <button
              onClick={() => setView("output")}
              className={`w-full py-2 px-4 rounded-lg text-center ${
                view === "output"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Edit Output
            </button>

            <button
              onClick={() => setView("qr")}
              className={`w-full py-2 px-4 rounded-lg text-center ${
                view === "qr"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Preview QR
            </button>

            <button
              onClick={() => setView("test")}
              className={`w-full py-2 px-4 rounded-lg text-center ${
                view === "test"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Test Form
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        {!selected && (
          <h2 className="text-xl text-gray-500">Please select a form</h2>
        )}

        {selected && (
          <>
            {view === "schema" && <EditSchema formName={selected} />}
            {view === "output" && <EditOutput formName={selected} />}
            {view === "qr" && <PreviewQR formName={selected} />}
            {view === "test" && <TestForm formName={selected} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
