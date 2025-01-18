import { IInvoice } from '../../types/invoice';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  LoadingPlaceholder,
  PdfViewer,
} from '@pdf-generation-comparison/ui';
import { saveAs } from 'file-saver';
import { jsPdfGenerator } from './jsPdfGenerator';
import { useDownloadPdf } from '../../hooks/useDownloadPdf';

type Props = {
  data: IInvoice;
};
const JsPdfDocPreview = ({ data }: Props) => {
  const { onDownload } = useDownloadPdf({ data, engine: 'jspdf' });
  const [document, setDocument] = useState<Blob>();
  const downloadPdfClientGeneration = useCallback(async () => {
    if (!document) {
      throw new Error("Can't download the document till it's fully rendered");
    }
    saveAs(document, `${data.title}${data.invoiceId}`);
  }, [data.invoiceId, data.title, document]);

  useEffect(() => {
    jsPdfGenerator(data).then((res) => {
      setDocument(new Blob([res], { type: 'application/pdf' }));
    });
  }, [data]);

  if (!document) return <LoadingPlaceholder />;

  return (
    <div className="space-y-4">
      <div className="space-x-3 flex">
        <Button onClick={onDownload} variant="secondary" size="full">
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

export default JsPdfDocPreview;
