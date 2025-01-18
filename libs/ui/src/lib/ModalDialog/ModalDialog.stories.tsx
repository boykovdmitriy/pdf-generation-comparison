import type { Meta, StoryObj } from '@storybook/react';
import { ModalDialog, ModalProps } from './ModalDialog';

import { expect } from '@storybook/jest';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { fn } from '@storybook/test';
import {
  ensureElements,
  getElements,
  getModal,
  modalInteractions,
} from './shared-spec';

const meta: Meta<typeof ModalDialog> = {
  component: ModalDialog,
  title: 'ModalDialog',
};
export default meta;
type Story = StoryObj<typeof ModalDialog>;

export const Primary: Story = {
  args: {
    open: true,
    title: 'Very Important Title',
    onClose: fn(),
    children: (
      <>
        <Typography>Some random content</Typography>
        <div className="grid grid-cols-2 gap-3">
          <Button size="full" variant="secondary">
            Close
          </Button>
          <Button size="full" variant="primary">
            Confirm
          </Button>
        </div>
      </>
    ),
  },
  play: async ({ canvasElement, args }) => {
    if (!canvasElement.parentElement) {
      new Error('parent element must exist');
      return;
    }
    const { modal, closeButton, title, icon } = getElements(canvasElement);
    await ensureElements(
      {
        modal,
        closeButton,
        title,
        icon,
      },
      args as ModalProps
    );

    await modalInteractions(
      {
        closeButton,
        modal,
      },
      args.onClose
    );
  },
};

export const PrimaryNoTitle: Story = {
  args: {
    ...Primary.args,
    title: undefined,
  },
  play: Primary.play,
};

export const Alert: Story = {
  args: {
    ...Primary.args,
    variant: 'alert',
  },
  play: Primary.play,
};

export const AlertNoTitle: Story = {
  args: {
    ...Primary.args,
    variant: 'alert',
    title: undefined,
  },
  play: Primary.play,
};

export const ClosedModal: Story = {
  args: {
    ...Primary.args,
    open: false,
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement.parentElement) {
      new Error('parent element must exist');
      return;
    }
    const modal = getModal(canvasElement.parentElement);
    await expect(modal).toBeFalsy();
  },
};
