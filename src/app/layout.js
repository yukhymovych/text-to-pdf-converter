import React from "react";
import "./globals.css";

export const metadata = {
  title: "Text to PDF Converter",
  description: "Convert any text to pdf quickly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
