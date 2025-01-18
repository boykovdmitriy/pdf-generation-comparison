// @ts-expect-error suppressed because there are no type definitions for the lib
import * as pdfMake from 'pdfmake/build/pdfmake';
// @ts-expect-error suppressed because there are no type definitions for the lib
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { IInvoice } from '../../types/invoice';
import { templateBuilder } from './templateBuilder';

pdfMake.addVirtualFileSystem(pdfFonts);

export const pdfMakeClientGeneration = (data: IInvoice): Promise<Blob> => {
  const docDefinition = templateBuilder(data);
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  return new Promise((resolve) => {
    pdfDocGenerator.getBlob(resolve);
  });
};
