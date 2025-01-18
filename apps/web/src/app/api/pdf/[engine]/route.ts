import { z } from 'zod';
import { NextResponse } from 'next/server';
import { IInvoice } from '../../../../types/invoice';
import { engines } from '../../../../constants/engines';
import { generateDocument } from './generateDocument';

const invoiceSchema = z.object({
  title: z.string(),
  invoiceId: z.string(),
  from: z.string(),
  to: z.string(),
  date: z.string(),
  dueDate: z.string(),
  items: z
    .object({
      title: z.string(),
      quantity: z.number(),
      rate: z.number(),
    })
    .array(),
  notes: z.string().optional(),
  terms: z.string().optional(),
});

type Params = {
  engine: string;
};

export async function POST(request: Request, context: { params: Params }) {
  const data = (await request.json()) as IInvoice;
  const result = invoiceSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Invalid request',
        details: result.error.errors,
      },
      { status: 400 }
    );
  }
  if (!engines.includes(context.params.engine)) {
    return NextResponse.json(
      {
        error: 'Invalid request',
        details: `Attempt to access unsupported engine ${context.params.engine}`,
      },
      { status: 400 }
    );
  }

  const doc = await generateDocument(data, context.params.engine);

  return new NextResponse(doc, {
    status: 200,
    headers: new Headers({
      'content-disposition': `attachment; filename=${data.title}${data.invoiceId}.pdf`,
      'content-type': 'application/zip',
    }),
  });
}
