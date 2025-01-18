import { IInvoice } from '../../types/invoice';
import { renderToStream } from '@react-pdf/renderer';
import { PdfDocument } from './PDFDocument';

export const reactPdfRenderToStream = (data: IInvoice) => {
  return renderToStream(<PdfDocument data={data} />);
};
