import { render } from '@testing-library/react';

import ModalDialog, { ModalProps } from './ModalDialog';
import {
  Alert,
  Primary,
  PrimaryNoTitle,
  AlertNoTitle,
  ClosedModal,
} from './ModalDialog.stories';
import { fn, Mock } from '@storybook/test';
import {
  ensureElements,
  getElements,
  getModal,
  modalInteractions,
} from './shared-spec';
import { act } from 'react';
import { expect } from '@storybook/jest';

const renderElement = async (args: ModalProps) => {
  const mockOnClose = args.onClose ?? fn();
  let element: HTMLElement | undefined;
  await act(async () => {
    const { baseElement } = render(
      <ModalDialog {...args} onClose={mockOnClose}>
        {args.children}
      </ModalDialog>
    );
    element = baseElement;
  });
  if (!element) throw new Error('error');

  return {
    element,
    mockOnClose,
  };
};

const testUnit = (args: typeof Primary.args) => {
  it('Renders Correctly', async () => {
    if (!args) {
      throw new Error('Args must be passed');
    }
    const { element } = await renderElement(args as ModalProps);

    const { modal, closeButton, title, icon } = getElements(element);

    await ensureElements(
      {
        modal,
        closeButton,
        title,
        icon,
      },
      args as ModalProps
    );
  });
  it('Closing modal works correctly', async () => {
    if (!args) {
      throw new Error('Args must be passed');
    }
    const { element, mockOnClose } = await renderElement(args as ModalProps);

    if (!element) throw new Error('error');

    const { modal, closeButton } = getElements(element);

    await modalInteractions(
      {
        closeButton,
        modal,
      },
      mockOnClose
    );
    (mockOnClose as Mock).mockClear();
  });
};

describe('ModalDialog', () => {
  describe('Primary', () => {
    testUnit(Primary.args);
  });
  describe('PrimaryNoTitle', () => {
    testUnit(PrimaryNoTitle.args);
  });
  describe('Alert', () => {
    testUnit(Alert.args);
  });
  describe('AlertNoTitle', () => {
    testUnit(AlertNoTitle.args);
  });
  describe('Closed State', () => {
    it('If Open is false modal is closed', async () => {
      const { element } = await renderElement(ClosedModal.args as ModalProps);
      if (!element.parentElement) {
        new Error('parent element must exist');
        return;
      }
      const modal = getModal(element.parentElement);
      await expect(modal).toBeFalsy();
    });
  });
});
