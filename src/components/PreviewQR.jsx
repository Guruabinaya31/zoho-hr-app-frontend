const PreviewQR = ({ formName }) => {
  return (
    <div className="max-w-md mx-auto item-center justify-center">
      <h2 className="text-xl font-semibold mb-4 text-center">QR Preview — {formName}</h2>

      <div className="bg-white p-6 rounded-lg shadow text-center">
        <img
          src={`http://localhost:5000/forms/${encodeURIComponent(formName)}/qr`}
          alt="QR Code"
          width={220}
          height={220}
          className="mx-auto mb-3 rounded-md border"
        />
        <div className="text-sm text-gray-600">Scan to open the form</div>
      </div>
    </div>
  );
};

export default PreviewQR;
