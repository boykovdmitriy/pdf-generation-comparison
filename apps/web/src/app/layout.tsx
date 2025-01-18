import './global.css';
import React from 'react';
import { Typography } from '@pdf-generation-comparison/ui';

export const metadata = {
  title: 'PDF generation comparison',
  description:
    "It's hard to decide what library to use for pdf generation. I covered some of them to save your time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-2 md:p-4">
        <main>
          <Typography variant={'h1'} className="text-center">
            PDF generation comparison
          </Typography>
          <section className="mt-8">{children}</section>
        </main>
      </body>
    </html>
  );
}
