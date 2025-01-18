import { IInvoice } from '../../types/invoice';
import { calculateTotalOfInvoice } from '../../utils/calculateTotalOfInvoice';

const makeInvoiceItem = (item: Array<string | number>) => {
  return item;
};

export const templateBuilder = (data: IInvoice) => {
  return {
    content: [
      { text: 'Invoice', style: 'header' },
      { text: data.invoiceId, alignment: 'right' },
      {
        margin: [0, 20, 0, 0],
        layout: 'noBorders', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 0,
          widths: ['auto', 'auto', '*', 100, 'auto'],

          body: [
            [
              { text: 'Invoice From:', style: 'tableLabel' },
              data.from,
              '',
              {
                text: 'Date:',
                style: 'tableLabel',
              },
              { text: data.date, style: 'tableRightValue' },
            ],
            [
              { text: 'Invoice To:', style: 'tableLabel' },
              data.to,
              '',
              {
                text: 'Due Date:',
                style: 'tableLabel',
              },
              { text: data.dueDate, style: 'tableRightValue' },
            ],
          ],
        },
      },
      {
        layout: 'lightHorizontalLines', // optional
        margin: [0, 20, 0, 0],
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ['*', 50, 100, 100],

          body: [
            makeInvoiceItem(['Item', 'Quantity', 'Rate', 'Amount']),
            ...data.items.map((x) =>
              makeInvoiceItem([
                x.title,
                x.quantity || '0',
                `$${x.rate}`,
                `$${(x.quantity ?? 0) * (x.rate ?? 0)}`,
              ])
            ),
          ],
        },
      },
      {
        margin: [0, 40, 100, 0],
        align: 'right',
        columns: [
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: '',
          },
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Total',
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: 'auto',
            text: calculateTotalOfInvoice(data.items),
          },
        ],
        // optional space between columns
        columnGap: 10,
      },
      {
        text: '',
        margin: [0, 40, 0, 0],
      },
      ...(data.terms
        ? [
            { text: 'Terms:', alignment: 'left' },
            {
              text: data.terms,
              alignment: 'left',
              margin: [10, 2, 0, 20],
            },
          ]
        : []),
      ...(data.notes
        ? [
            { text: 'Notes:', alignment: 'left' },
            {
              text: data.notes,
              alignment: 'left',
              margin: [10, 2, 0, 20],
            },
          ]
        : []),
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: 'right',
      },
      tableLabel: {
        color: 'gray',
      },
      tableRightValue: {
        alignment: 'right',
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
      },
    },
  };
};
