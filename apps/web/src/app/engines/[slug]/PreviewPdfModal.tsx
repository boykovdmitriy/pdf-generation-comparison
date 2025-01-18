import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingPlaceholder, ModalDialog } from '@pdf-generation-comparison/ui';
import { IInvoice } from '../../../types/invoice';

const ReactPdfDocument = dynamic(
  () => import('../../../pdfGenerators/ReactPdf'),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const PdfMeDocPreview = dynamic(() => import('../../../pdfGenerators/PdfMe'), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});
const PdfMakeDocPreview = dynamic(
  () => import('../../../pdfGenerators/PdfMake'),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const PdfLibDocPreview = dynamic(
  () => import('../../../pdfGenerators/PdfLib'),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const JsPdfDocPreview = dynamic(() => import('../../../pdfGenerators/JsPdf'), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

type Props = {
  onClose: () => void;
  data: IInvoice;
  engine: string;
};

export const PreviewPdfModal = ({ onClose, data, engine }: Props) => {
  return (
    <ModalDialog open onClose={onClose} title="Preview">
      {engine === 'react-pdf' && <ReactPdfDocument data={data} />}
      {engine === 'pdfme' && <PdfMeDocPreview data={data} />}
      {engine === 'pdfmake' && <PdfMakeDocPreview data={data} />}
      {engine === 'pdf-lib' && <PdfLibDocPreview data={data} />}
      {engine === 'jspdf' && <JsPdfDocPreview data={data} />}
    </ModalDialog>
  );
};
