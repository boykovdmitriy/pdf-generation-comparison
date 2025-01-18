import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { fn } from '@storybook/test';
import {
  ensureElements,
  getElements,
  mouseInteractions,
} from './Button.shared-spec';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    type: 'button',
    size: 'normal',
    variant: 'primary',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const elements = await getElements(canvasElement);
    await ensureElements(elements, args);
    await mouseInteractions(elements, args);
  },
};

export const PrimarySmall: Story = {
  args: {
    ...Primary.args,
    size: 'small',
  },
  play: Primary.play,
};

export const PrimaryFull: Story = {
  args: {
    ...Primary.args,
    size: 'full',
  },
  play: Primary.play,
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    size: 'full',
    disabled: true,
  },
  play: Primary.play,
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    children: 'Secondary Button',
    variant: 'secondary',
  },
  play: Primary.play,
};

export const SecondarySmall: Story = {
  args: {
    ...PrimarySmall.args,
    variant: 'secondary',
    children: 'Secondary Button',
  },
  play: Primary.play,
};

export const SecondaryFull: Story = {
  args: {
    ...PrimaryFull.args,
    variant: 'secondary',
    children: 'Secondary Button',
  },
  play: Primary.play,
};

export const Warning: Story = {
  args: {
    ...Primary.args,
    variant: 'warning',
    children: 'Warning Button',
  },
  play: Primary.play,
};

export const WarningSmall: Story = {
  args: {
    ...PrimarySmall.args,
    variant: 'warning',
    children: 'Warning Button',
  },
  play: Primary.play,
};

export const WarningFull: Story = {
  args: {
    ...PrimaryFull.args,
    variant: 'warning',
    children: 'Warning Button',
  },
  play: Primary.play,
};
