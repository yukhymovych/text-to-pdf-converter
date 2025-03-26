This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Components Overview

### TextInput

#### Description:
A component that displays a text input field for users to write text.

#### Props:
text (string): The current text entered by the user.
setText (function): A function to update the text.

#### Main Actions:
Handles text input changes and passes the updated text back to the parent component.

### HistoryList

#### Description:
A component that displays a list of generated PDFs.

#### Props:
history (array): An array of history objects, each containing the URL and metadata of a generated PDF.
openPDF (function): A function that opens a selected PDF when clicked.

#### Main Actions:
Displays the list of previously generated PDFs and allows users to open any document by clicking on its entry.

### PDFViewer

#### Description:

A component for displaying a PDF in an iframe.

#### Props:
PDFUrl (string): The URL of the PDF file to be displayed.

#### Main Actions:
Embeds an iframe to view the selected PDF file.

### ClearHistoryButton

#### Description:
A component for clearing the history of generated PDFs.

#### Props:
clearHistory (function): A function to clear the history.

#### Main Actions:
Clears the history of PDFs and removes the stored data from local storage.

### GeneratePdfButton

#### Description:
A button component for generating a PDF.

#### Props:
generatePdf (function): A function that sends a request to the server to generate a PDF.
loading (boolean): A boolean representing the loading state while the PDF is being generated.

#### Main Actions:
Sends a request to the server to generate a PDF and updates the UI based on the loading state.
