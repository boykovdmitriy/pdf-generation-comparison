import { IInvoice } from '../../types/invoice';
import React, { useCallback, useEffect, useState } from 'react';
import { pdfMeGenerator } from './pdfMeGenerator';
import {
  Button,
  LoadingPlaceholder,
  PdfViewer,
} from '@pdf-generation-comparison/ui';
import { saveAs } from 'file-saver';
import { useDownloadPdf } from '../../hooks/useDownloadPdf';

type Props = {
  data: IInvoice;
};
const PdfMeDocPreview = ({ data }: Props) => {
  const { onDownload } = useDownloadPdf({ data, engine: 'pdfme' });
  const [document, setDocument] = useState<Blob>();
  const downloadPdfClientGeneration = useCallback(async () => {
    if (!document) {
      throw new Error("Can't download the document till it's fully rendered");
    }
    saveAs(document, `${data.title}${data.invoiceId}`);
  }, [data]);

  useEffect(() => {
    pdfMeGenerator({ data }).then((res) => {
      const blob = new Blob([res.buffer], { type: 'application/pdf' });
      setDocument(blob);
    });
  }, [data]);

  if (!document) return <LoadingPlaceholder />;

  return (
    <div className="space-y-4">
      <div className="space-x-3 flex">
        <Button onClick={onDownload} size="full" variant="secondary">
          Render and download(server)
        </Button>
        <Button onClick={downloadPdfClientGeneration} size="full">
          Download
        </Button>
      </div>
      <PdfViewer document={document} />
    </div>
  );
};

export default PdfMeDocPreview;
