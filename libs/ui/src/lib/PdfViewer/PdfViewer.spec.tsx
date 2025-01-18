import { render } from '@testing-library/react';
import { fn, Mock } from '@storybook/test';

import { PdfViewer } from './PdfViewer';
import { PdfAsBlob, PdfAsUrl } from './PdfViewer.stories';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

describe('PdfViewer', () => {
  global.URL.createObjectURL = fn(() => 'blob:');
  global.URL.revokeObjectURL = fn();
  afterEach(() => {
    (global.URL.createObjectURL as Mock).mockReset();
    (global.URL.revokeObjectURL as Mock).mockReset();
  });
  it('Renders correctly with url', async () => {
    if (!PdfAsUrl.args || !PdfAsUrl.args.document) {
      throw new Error(
        'Arguments must exist in storybook story in order to be used in tests'
      );
    }
    const { baseElement } = render(
      <PdfViewer document={PdfAsUrl.args.document} />
    );
    const canvas = within(baseElement);

    await waitFor(async () => {
      await expect(canvas.getByTestId('pdf preview')).toBeTruthy();
    });

    const frame = canvas.getByTestId('pdf preview');
    await expect(frame.getAttribute('src')).toBe(PdfAsUrl.args.document);
  });
  it('Renders correctly with blob', async () => {
    if (!PdfAsBlob.args || !PdfAsBlob.args.document) {
      throw new Error(
        'Arguments must exist in storybook story in order to be used in tests'
      );
    }
    const { baseElement } = render(
      <PdfViewer document={PdfAsBlob.args.document} />
    );
    const canvas = within(baseElement);
    await waitFor(
      async () => {
        await expect(canvas.getByTestId('pdf preview')).toBeTruthy();
      },
      { interval: 100, timeout: 500 }
    );
    const frame = canvas.getByTestId('pdf preview');

    await expect(frame.getAttribute('src')).toContain('blob:');
  });
});
