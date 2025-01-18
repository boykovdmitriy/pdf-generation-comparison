'use client';

import { useEffect, useState } from 'react';

type Props = {
  document: string | Blob;
};

export function PdfViewer({ document }: Props) {
  const [pdfDocument, setDocument] = useState<string>();
  useEffect(() => {
    if (typeof document === 'string') {
      setDocument(document);
      return;
    }

    const documentUrl = URL.createObjectURL(document);
    setDocument(documentUrl);
    return () => {
      URL.revokeObjectURL(documentUrl);
    };
  }, [document]);

  if (!pdfDocument) {
    return '...loading';
  }

  return (
    <iframe
      data-testid="pdf preview"
      src={pdfDocument}
      title="rendered pdf document"
      width="100%"
      height={500}
      className="border-0"
    />
  );
}
