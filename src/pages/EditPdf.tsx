import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const EditPdf: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [modifiedPdf, setModifiedPdf] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPdfFile(event.target.files[0]);
      setPageNumber(1);
      setModifiedPdf(null);
      setNumPages(0);
    }
  };

  const addTextToPdf = async () => {
    if (pdfFile && inputRef.current) {
      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();
      const nameField = form.getTextField("Name");

      if (nameField) {
        const text = inputRef.current.value;
        nameField.setText(text);
      }

      const modifiedPdfBytes = await pdfDoc.save();
      setModifiedPdf(modifiedPdfBytes);
      setNumPages(pdfDoc.getPageCount());
    }
  };

  const handleExportPdf = () => {
    if (modifiedPdf) {
      const blob = new Blob([modifiedPdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "modified_pdf.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-700 to-fuchsia-500 text-white">
      <Link to="/">
        <button className="bg-white-500 text-purple flex items-center py-2 px-4 rounded-full text-sm font-normal w-32">
          <span className="mr-2">&larr;</span> Back
        </button>
      </Link>
      <div className="flex items-center justify-center flex-col">
        <div className="flex flex-col ml-4 items-center">
          <h1 className="text-4xl font-bold mb-4">PDF editor</h1>
          <h1 className="mb-16">Edit PDF files, Fill & sign PDF</h1>
          <p className="mb-4">Upload a PDF:</p>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          {pdfFile && (
            <div style={{ position: 'relative' }}>
              <Document
                file={pdfFile}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <input
                ref={inputRef}
                type="text"
                id="name"
                placeholder="Enter text for name field"
                style={{
                  position: "absolute",
                  left: "100px", // Adjust as needed
                  top: "100px", // Adjust as needed
                  color: "black",
                }}
              />
            </div>
          )}
          <button
            onClick={addTextToPdf}
            disabled={!pdfFile}
            className="bg-white text-purple-700 py-2 px-4 rounded-full text-sm font-normal w-48 mt-4"
          >
            Add Text to PDF
          </button>
          <button
            onClick={handleExportPdf}
            disabled={!modifiedPdf}
            className="bg-white text-purple-700 py-2 px-4 rounded-full text-sm font-normal w-48 mt-4"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPdf;
