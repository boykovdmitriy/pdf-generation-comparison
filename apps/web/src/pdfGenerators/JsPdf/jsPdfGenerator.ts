import { jsPDF as JsPDF } from 'jspdf';
import { IInvoice } from '../../types/invoice';
import { calculateTotalOfInvoice } from '../../utils/calculateTotalOfInvoice';

const titleFont = 36;
const regularFont = 18;
const padding = 10;

const generator = (data: IInvoice): Uint8Array => {
  const doc = new JsPDF();
  const width = doc.internal.pageSize.getWidth();
  doc.setFontSize(titleFont);
  doc.text(data.title, width - padding - doc.getTextWidth(data.title), 20);
  doc.setFontSize(regularFont);
  doc.text(
    data.invoiceId,
    width - padding - doc.getTextWidth(data.invoiceId),
    30
  );

  doc.text('Invoice From:', padding, 45);
  doc.text(data.from, padding + doc.getTextWidth('Invoice From:') + 2, 45);

  doc.text('Invoice To:', padding, 55);
  doc.text(data.to, padding + doc.getTextWidth('Invoice To:') + 2, 55);

  doc.text('Date:', 140, 45);
  doc.text(data.date, width - doc.getTextWidth(data.date) - padding, 45);

  doc.text('Due date:', 140, 55);
  doc.text(data.dueDate, width - doc.getTextWidth(data.dueDate) - padding, 55);

  doc.setFillColor('black');
  doc.setTextColor('white');
  doc.setFontSize(16);
  doc.rect(padding, 65, width - padding * 2, 10, 'F');
  doc.text('Item', padding + 5, 72);
  doc.text('Quantity', padding + 85, 72);
  doc.text('Rate', padding + 125, 72);
  doc.text('Amount', padding + 155, 72);

  let lastItem = 83;
  doc.setTextColor('black');
  data.items.forEach((x) => {
    doc.text(x.title, padding + 5, lastItem);
    doc.text(
      `${x.quantity}`,
      padding +
        85 +
        doc.getTextWidth('Quantity') / 2 -
        doc.getTextWidth(`${x.quantity}`) / 2,
      lastItem
    );
    doc.text(`$${x.rate}`, padding + 125, lastItem);
    doc.text(`$${(x.quantity ?? 0) * (x.rate ?? 0)}`, padding + 155, lastItem);
    lastItem += 10;
  });

  lastItem += 10;
  doc.setFontSize(regularFont);
  doc.text(
    `Total: ${calculateTotalOfInvoice(data.items)}`,
    padding + 125,
    lastItem
  );

  lastItem += 30;

  if (data.terms) {
    doc.text(`Terms:`, padding, lastItem);

    lastItem += 8;
    doc.text(data.terms, padding + 5, lastItem);
    lastItem += 20;
  }

  if (data.notes) {
    doc.text(`Notes:`, padding, lastItem);

    lastItem += 8;
    doc.text(data.notes, padding + 5, lastItem);
  }

  return new Uint8Array(doc.output('arraybuffer'));
};

export const jsPdfGenerator = (data: IInvoice): Promise<Uint8Array> => {
  return new Promise((res) => {
    const doc = generator(data);
    res(doc);
  });
};
