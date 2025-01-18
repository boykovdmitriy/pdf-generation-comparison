import { generate } from '@pdfme/generator';
import { table, text } from '@pdfme/schemas';
import { IInvoice } from '../../types/invoice';
import { prepareData } from './prepareData';

type Props = {
  data: IInvoice;
};
export const pdfMeGenerator = ({ data }: Props) => {
  const [template, inputs] = prepareData(data);
  return generate({
    template,
    inputs,
    plugins: { Table: table, Text: text },
  });
};
