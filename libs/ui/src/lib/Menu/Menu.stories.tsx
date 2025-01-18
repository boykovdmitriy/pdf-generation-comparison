import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'Menu',
};
export default meta;
type Story = StoryObj<typeof Menu>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Menu!/gi)).toBeTruthy();
  },
};
