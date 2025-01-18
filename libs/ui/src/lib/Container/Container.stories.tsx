import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Container> = {
  component: Container,
  title: 'Container',
};
export default meta;
type Story = StoryObj<typeof Container>;

export const Primary: Story = {
  args: {
    children: 'content',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const container = await canvas.queryByRole('generic');
    await expect(container?.innerText || container?.textContent).toBe(
      args?.children
    );
  },
};
