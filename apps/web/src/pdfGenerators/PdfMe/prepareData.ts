import { IInvoice } from '../../types/invoice';
import { pdfMeTemplateGenerator } from './pdfMeTemplateGenerator';
import { Template } from '@pdfme/common';

export const prepareData = (data: IInvoice) => {
  const template = pdfMeTemplateGenerator({
    items: data.items.length,
    hasNotes: !!data.notes,
    hasTerms: !!data.terms,
  });
  const total = data.items.reduce((acc, item) => {
    if (item.rate && item.quantity) {
      return acc + item.rate * item.quantity;
    }
    return acc;
  }, 0);

  const inputs = [
    {
      title: data.title,
      id: data.invoiceId,
      from: data.from,
      to: data.to,
      date: data.date,
      dueDate: data.dueDate,
      invoiceItems: data.items.map((x) => [
        x.title,
        x.quantity?.toString(),
        `$${x.rate}`,
        `$${(x.quantity ?? 0) * (x.rate ?? 0)}`,
      ]),
      total: '$' + total,
      terms: data.terms,
      notes: data.notes,
    },
  ];

  return [template as Template, inputs] as const;
};
