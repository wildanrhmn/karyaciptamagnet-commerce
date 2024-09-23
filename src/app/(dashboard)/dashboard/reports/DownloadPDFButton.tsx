// app/dashboard/reports/DownloadPDFButton.tsx
'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function DownloadPDFButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    const reportElement = document.getElementById('report-content');
    if (reportElement) {
      const canvas = await html2canvas(reportElement);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('sales-report.pdf');
    }
    setIsGenerating(false);
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
    </button>
  );
}