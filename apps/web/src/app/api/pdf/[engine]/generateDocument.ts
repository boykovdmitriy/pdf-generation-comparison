import { IInvoice } from '../../../../types/invoice';
import { jsPdfGenerator } from '../../../../pdfGenerators/JsPdf/jsPdfGenerator';
import { pdfLibGenerator } from '../../../../pdfGenerators/PdfLib/pdfLibGenerator';
import { pdfMeGenerator } from '../../../../pdfGenerators/PdfMe/pdfMeGenerator';
import { reactPdfRenderToStream } from '../../../../pdfGenerators/ReactPdf/reactPdfRenderToStream';
import { streamConverter } from '../../../../utils/streamConverter';

export const generateDocument = async (data: IInvoice, engine: string) => {
  switch (engine) {
    case 'jspdf':
      return jsPdfGenerator(data);
    case 'pdf-lib':
      return pdfLibGenerator(data);
    case 'pdfme':
      return pdfMeGenerator({ data });
    case 'react-pdf': {
      const stream = await reactPdfRenderToStream(data);
      return streamConverter(stream);
    }
    default:
      throw new Error('unsupported engine');
  }
};
