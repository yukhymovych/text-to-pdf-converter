import React from "react";

export const GeneratePDFButton = ({ generatePdf, loading }) => {
  return (
    <button
      className="rounded bg-sky-600 py-2 px-4 text-sm text-white hover:bg-sky-500 active:bg-sky-700 mt-4"
      onClick={generatePdf}
      disabled={loading}
    >
      {loading ? "Generating PDF..." : "Convert to PDF"}
    </button>
  );
};
