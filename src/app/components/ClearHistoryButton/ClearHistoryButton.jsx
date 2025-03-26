import React from "react";

export const ClearHistoryButton = ({ history, clearHistory }) => {
  if (history.length === 0) return null;
  return (
    <button className="mt-2 text-xs text-red-600" onClick={clearHistory}>
      Clear History
    </button>
  );
};
