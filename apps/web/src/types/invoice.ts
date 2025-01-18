export interface IInvoiceItem {
  title: string;
  quantity?: number;
  rate?: number;
}
export interface IInvoice {
  title: string;
  invoiceId: string;
  from: string;
  to: string;
  date: string;
  dueDate: string;
  items: Array<IInvoiceItem>;
  notes?: string;
  terms?: string;
}
