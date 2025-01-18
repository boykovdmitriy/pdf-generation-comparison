import type { Meta, StoryObj } from '@storybook/react';
import { PdfViewer } from './PdfViewer';

import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof PdfViewer> = {
  component: PdfViewer,
  title: 'PdfViewer',
};
export default meta;
type Story = StoryObj<typeof PdfViewer>;

export const PdfAsUrl: Story = {
  args: {
    document:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await expect(canvas.getByTestId('pdf preview')).toBeTruthy();
    });
    const frame = canvas.getByTestId('pdf preview');
    await expect(frame.getAttribute('src')).toBe(args.document);
  },
};

export const PdfAsBlob: Story = {
  args: {
    document: new Blob(['%PDF-1.4\n%...'], { type: 'application/pdf' }),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await expect(canvas.getByTestId('pdf preview')).toBeTruthy();
    });
    const frame = canvas.getByTestId('pdf preview');
    await expect(frame.getAttribute('src')).toContain('blob:');
  },
};
