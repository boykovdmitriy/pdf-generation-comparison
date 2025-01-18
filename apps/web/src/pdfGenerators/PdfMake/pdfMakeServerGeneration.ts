// @ts-expect-error i didn't find types and decided not to waste time on typing it for now
import PdfPrinter from 'pdfmake';
import path from 'path';
import { IInvoice } from '../../types/invoice';
import { templateBuilder } from './templateBuilder';

const fonts = {
  Roboto: {
    normal: path.resolve('./fonts/Roboto-Regular.ttf'),
    bold: path.resolve('./fonts/Roboto-Medium.ttf'),
    italics: path.resolve('./fonts/Roboto-Italic.ttf'),
    bolditalics: path.resolve('./fonts/Roboto-MediumItalic.ttf'),
  },
};

/*Sadly speaking I didn't make this generation work ether because as a result of this function
 * I get 404 error in API route for no reason. In the same time in simple Node.js script it works just fine.
 * So I would concentrate on other examples and leave it as it is for now */
export const pdfMakeServerGeneration = (
  data: IInvoice
): Promise<NodeJS.ReadableStream> => {
  return new Promise((resolve) => {
    const printer = new PdfPrinter(fonts);
    const docDefinition = templateBuilder(data);
    resolve(printer.createPdfKitDocument(docDefinition));
  });
};
