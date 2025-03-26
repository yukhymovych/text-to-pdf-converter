"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  HistoryList,
  PDFViewer,
  ClearHistoryButton,
  GeneratePDFButton,
} from "../components";

export const Converter = () => {
  const [text, setText] = useState("");
  const [PDFUrl, setPDFUrl] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);

  const API_KEY = "78684310-850d-427a-8432-4a6487f6dbc4";

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("pdfHistory"));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

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
        <h1 className="text-[21px] font-bold mb-[20px]">
          Text to PDF Converter
        </h1>
        <TextInput text={text} setText={setText} />
        <GeneratePDFButton generatePdf={generatePdf} loading={loading} />
      </div>

      <HistoryList history={history} openPDF={openPDF} />
      <ClearHistoryButton history={history} clearHistory={clearHistory} />

      <PDFViewer PDFUrl={PDFUrl} />
    </div>
  );
};

export default Converter;
