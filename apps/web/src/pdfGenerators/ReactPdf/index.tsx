'use client';
import React from 'react';
import { IInvoice } from '../../types/invoice';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { PdfDocument } from './PDFDocument';
import { downloadFile } from '../../utils/downloadFileByFetch';
import { Button } from '@pdf-generation-comparison/ui';

type Props = {
  data: IInvoice;
};

const ReactPdfExample: React.FC<Props> = ({ data }) => {
  const onDownload = async () => {
    await downloadFile('pdf/react-pdf', {
      body: JSON.stringify(data),
      method: 'POST',
    });
  };
  return (
    <section className="space-y-4">
      <div className="space-x-3 flex">
        <Button onClick={onDownload} variant="secondary" size="full">
          Render and download(server)
        </Button>
        <PDFDownloadLink
          document={<PdfDocument data={data} />}
          fileName={`${data.title}${data.invoiceId}`}
          className="flex justify-center items-center rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-400 text-white active:bg-indigo-500 w-full px-5 py-3 text-base"
        >
          Download
        </PDFDownloadLink>
      </div>
      <PDFViewer className="w-full border-0 h-[600px]">
        <PdfDocument data={data} />
      </PDFViewer>
    </section>
  );
};

export default ReactPdfExample;
