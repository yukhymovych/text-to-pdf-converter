"use client";
import React, { useState, useRef } from "react";

export const Converter = () => {
  const [text, setText] = useState("");
  const [PDFUrl, setPDFUrl] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);

  const API_KEY = "78684310-850d-427a-8432-4a6487f6dbc4";

  const generatePdf = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate a PDF.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://95.217.134.12:4010/create-pdf?apiKey=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create PDF");
      }

      const PDFBlob = await response.blob();
      const newPDFUrl = URL.createObjectURL(PDFBlob);

      const timestamp = new Date().toLocaleString();
      const newEntry = {
        id: Date.now(),
        name: `Document ${history.length + 1}`,
        url: newPDFUrl,
        timestamp,
      };

      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem("pdfHistory", JSON.stringify(updatedHistory));

      setPDFUrl(newPDFUrl);
      if (iframeRef.current) {
        iframeRef.current.src = newPDFUrl;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create PDF. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const openPDF = (url) => {
    setPDFUrl(url);
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setPDFUrl(null);
    localStorage.removeItem("pdfHistory");
  };

  return (
    <div className="container">
      <div className="inner-wrapper flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-[21px] font-bold mb-[20px]">
            Text to PDF Converter
          </h1>
          <p className="text-[16px] font-medium mb-[5px]">
            Write your text here
          </p>
          <textarea
            className="textarea w-[600px] h-[200px] p-2 border border-black rounded-md  "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          className="rounded bg-sky-600 py-2 px-4 text-sm text-white hover:bg-sky-500 active:bg-sky-700 mt-4"
          onClick={generatePdf}
          disabled={loading}
        >
          {loading ? "Generating PDF..." : "Convert to PDF"}
        </button>
      </div>

      {history.length > 0 && (
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
          <button className="mt-2 text-xs text-red-600" onClick={clearHistory}>
            Clear History
          </button>
        </div>
      )}

      {PDFUrl && (
        <iframe
          ref={iframeRef}
          src={PDFUrl}
          width="100%"
          height="900px"
          style={{ border: "none", marginTop: "20px" }}
          role="iframe"
          data-testid="iframe"
        />
      )}
    </div>
  );
};
