import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import {
  ensureCorrectColor,
  ensureCorrectProps,
  ensureCorrectSize,
  getElement,
} from './shared-spec';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Typography',
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = {
  args: {
    children: 'Text',
    variant: 'h1',
    color: 'primary',
  },
  play: async ({ canvasElement, args }) => {
    const element = getElement(canvasElement, args.variant);
    await ensureCorrectProps(element, args);
    await ensureCorrectColor(element, args);
    await ensureCorrectSize(element, args);
  },
};

export const H2: Story = {
  args: {
    children: 'Text',
    variant: 'h2',
    color: 'primary',
  },
  play: H1.play,
};

export const Body: Story = {
  args: {
    children: 'Text',
    variant: 'body',
    color: 'primary',
  },
  play: H1.play,
};

export const Caption: Story = {
  args: {
    children: 'Text',
    variant: 'caption',
    color: 'primary',
  },
  play: H1.play,
};
