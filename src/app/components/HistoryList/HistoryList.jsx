import React from "react";

export const HistoryList = ({ history, openPDF }) => {
  if (history.length === 0) return null;
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Conversion History:</h3>
      <ul className="mt-2 border p-2 rounded bg-gray-100">
        {history.map((file) => (
          <li
            key={file.id}
            className="p-2 cursor-pointer hover:bg-gray-200 rounded"
            onClick={() => openPDF(file.url)}
          >
            {file.name} -{" "}
            <span className="text-gray-500 text-xs">{file.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
