'use client';
import { Container } from '@pdf-generation-comparison/ui/server';
import { findElementInArray } from '../../../utils/findElementInArray';
import { engines } from '../../../constants/engines';
import { Button, Typography } from '@pdf-generation-comparison/ui';
import { InvoiceForm } from '../../../components/InvoiceForm';
import { useState } from 'react';
import { PreviewPdfModal } from './PreviewPdfModal';
import { IInvoice } from '../../../types/invoice';
import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<IInvoice>();
  const [openPreview, setOpenPreview] = useState(false);
  const engine = findElementInArray(engines, params.slug);

  return (
    <Container>
      {openPreview && formData && (
        <PreviewPdfModal
          data={formData}
          engine={params.slug}
          onClose={() => setOpenPreview(false)}
        />
      )}
      <section className="flex mb-6">
        <Button
          variant="secondary"
          size="small"
          onClick={() => router.push('/')}
        >
          <BsArrowLeft />
        </Button>
        <Typography variant="h1" className="text-center w-full">
          {engine}
        </Typography>
      </section>
      <InvoiceForm
        onSubmit={(values) => {
          setFormData(values);
          setOpenPreview(true);
        }}
      />
    </Container>
  );
};

export default Page;
