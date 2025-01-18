import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

import { within } from '@storybook/testing-library';
import { fn } from '@storybook/test';
import { ensureElements, inputInteractions } from './Input.shared-spec';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    name: 'primary',
    label: 'Primary',
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
    type: 'text',
  },
  play: async ({ canvasElement, args }) => {
    const screen = within(canvasElement);

    await ensureElements({ element: canvasElement, screen }, args);
    await inputInteractions({ element: canvasElement, screen }, args);
  },
};

export const PrimaryValue: Story = {
  args: {
    name: 'primary',
    label: 'Primary',
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
    type: 'text',
    value: 'value',
  },
  play: Primary.play,
};

export const Error: Story = {
  args: {
    name: 'error',
    label: 'Error',
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
    error: 'error',
    type: 'text',
  },
  play: Primary.play,
};

export const ErrorValue: Story = {
  args: {
    name: 'error',
    label: 'Error',
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
    error: 'error',
    type: 'text',
    value: 'value',
  },
  play: Primary.play,
};

export const InputWithNoCallbacks: Story = {
  args: {
    name: 'primary',
    label: 'Primary',
    type: 'text',
    value: 'value',
    onChange: fn(),
  },
  play: Primary.play,
};
