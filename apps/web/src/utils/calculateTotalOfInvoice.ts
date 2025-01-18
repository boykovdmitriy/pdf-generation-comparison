import { IInvoiceItem } from '../types/invoice';

export const calculateTotalOfInvoice = (items: Array<IInvoiceItem>) => {
  const total = items.reduce((acc, item) => {
    if (item.rate && item.quantity) {
      return acc + item.rate * item.quantity;
    }
    return acc;
  }, 0);
  return `$${total}`;
};
