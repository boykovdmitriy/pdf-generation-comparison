import { IInvoice } from '../../types/invoice';
import { PdfLibWrapper } from './PdfLibWrapper';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

import { calculateTotalOfInvoice } from '../../utils/calculateTotalOfInvoice';
const titleFont = 36;
const regularFont = 18;
const padding = 20;

export const pdfLibGenerator = async (data: IInvoice) => {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const page = doc.addPage();
  page.setFont(font);

  const wrapper = new PdfLibWrapper({
    doc,
    page,
    font,
  });

  const { width, height } = page.getSize();

  const titleDim = wrapper.calculateDimensions(data.title, titleFont);
  wrapper.drawText({
    text: data.title,
    x: width - padding - titleDim.width,
    y: 10,
    size: titleFont,
  });

  const invoiceDm = wrapper.calculateDimensions(data.invoiceId, regularFont);
  wrapper.drawText({
    text: data.invoiceId,
    x: width - padding - invoiceDm.width,
    y: 50,
    size: regularFont,
  });

  wrapper.drawText({
    text: 'Invoice From:',
    x: padding,
    y: 90,
    size: regularFont,
  });

  const fromDim = wrapper.calculateDimensions('Invoice From:', regularFont);

  wrapper.drawText({
    text: data.from,
    x: padding + fromDim.width + 10,
    y: 90,
    size: regularFont,
  });

  wrapper.drawText({
    text: 'Invoice To:',
    x: padding,
    y: 110,
    size: regularFont,
  });

  wrapper.drawText({
    text: data.to,
    x: padding + fromDim.width + 10,
    y: 110,
    size: regularFont,
  });

  wrapper.drawText({
    text: 'Date:',
    x: 400,
    y: 90,
    size: regularFont,
  });

  const dateDim = wrapper.calculateDimensions(data.date, regularFont);
  wrapper.drawText({
    text: data.date,
    x: width - dateDim.width - padding,
    y: 90,
    size: regularFont,
  });

  wrapper.drawText({
    text: 'Due date:',
    x: 400,
    y: 110,
    size: regularFont,
  });

  const dueDateDim = wrapper.calculateDimensions(data.dueDate, regularFont);
  wrapper.drawText({
    text: data.dueDate,
    x: width - dueDateDim.width - padding,
    y: 110,
    size: regularFont,
  });

  page.drawRectangle({
    x: 10,
    y: height - 160 - padding,
    width: width - padding,
    height: 30,
    color: rgb(101 / 255, 123 / 255, 131 / 255),
    opacity: 0.6,
    borderWidth: 0,
  });

  wrapper.drawText({
    text: 'Item',
    x: 30,
    y: 150,
    size: regularFont,
  });
  wrapper.drawText({
    text: 'Quantity',
    x: 240,
    y: 150,
    size: regularFont,
  });
  wrapper.drawText({
    text: 'Rate',
    x: 360,
    y: 150,
    size: regularFont,
  });
  wrapper.drawText({
    text: 'Amount',
    x: 490,
    y: 150,
    size: regularFont,
  });

  let lastRenderedItem = 180;

  data.items.forEach((x) => {
    wrapper.drawText({
      text: x.title,
      x: 30,
      y: lastRenderedItem,
      size: regularFont,
    });
    wrapper.drawText({
      text: `${x.quantity}`,
      x: 240,
      y: lastRenderedItem,
      size: regularFont,
    });
    wrapper.drawText({
      text: `$${x.rate}`,
      x: 360,
      y: lastRenderedItem,
      size: regularFont,
    });
    wrapper.drawText({
      text: `$${(x.quantity ?? 0) * (x.rate ?? 0)}`,
      x: 490,
      y: lastRenderedItem,
      size: regularFont,
    });
    lastRenderedItem += 22;
    page.drawLine({
      start: { x: 10, y: height - lastRenderedItem - 5 },
      end: { x: width - 10, y: height - lastRenderedItem - 5 },
      color: rgb(101 / 255, 123 / 255, 131 / 255),
    });
  });

  lastRenderedItem += 20;
  wrapper.drawText({
    text: `Total: ${calculateTotalOfInvoice(data.items)}`,
    x: 360,
    y: lastRenderedItem,
    size: regularFont,
  });

  lastRenderedItem += 50;
  if (data.terms) {
    wrapper.drawText({
      text: `Terms:`,
      x: padding,
      y: lastRenderedItem,
      size: regularFont,
    });
    lastRenderedItem += 20;
    wrapper.drawText({
      text: data.terms,
      x: padding + 10,
      y: lastRenderedItem,
      size: regularFont,
    });
    lastRenderedItem += 40;
  }

  if (data.notes) {
    wrapper.drawText({
      text: `Notes:`,
      x: padding,
      y: lastRenderedItem,
      size: regularFont,
    });
    lastRenderedItem += 20;
    wrapper.drawText({
      text: data.notes,
      x: padding + 10,
      y: lastRenderedItem,
      size: regularFont,
    });
  }

  return await doc.save();
};
