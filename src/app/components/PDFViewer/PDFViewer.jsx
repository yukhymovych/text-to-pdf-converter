import React from "react";

export const PDFViewer = ({ PDFUrl }) => {
  return (
    PDFUrl && (
      <iframe
        src={PDFUrl}
        width="100%"
        height="900px"
        style={{ border: "none", marginTop: "20px" }}
        role="iframe"
        data-testid="iframe"
      />
    )
  );
};
