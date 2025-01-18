import type { Meta, StoryObj } from '@storybook/react';
import { LoadingPlaceholder } from './LoadingPlaceholder';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LoadingPlaceholder> = {
  component: LoadingPlaceholder,
  title: 'LoadingPlaceholder',
};
export default meta;
type Story = StoryObj<typeof LoadingPlaceholder>;

export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to LoadingPlaceholder!/gi)).toBeTruthy();
  },
};
