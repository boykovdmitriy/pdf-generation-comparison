import { expect } from '@storybook/jest';
import { ModalProps } from './ModalDialog';
import { userEvent } from '@storybook/test';
import { act } from 'react';

export const getModal = (element: HTMLElement) => {
  return element.querySelector('[role="dialog"]');
};

export const getElements = (canvasElement: HTMLElement) => {
  if (!canvasElement.parentElement) {
    throw new Error('parent element must exist');
  }
  const modal = getModal(canvasElement.parentElement);
  if (!modal) {
    throw new Error('Modal does not exist');
  }
  const closeButton = modal.querySelector('[data-type="close"]');
  const title = modal.getElementsByTagName('h1');
  const icon = modal.querySelector('[data-type="warning-icon"]');

  if (!closeButton) {
    throw new Error('closeButton element must exist');
  }
  if (!closeButton) {
    throw new Error('closeButton element must exist');
  }
  return {
    modal,
    closeButton,
    title: title[0],
    icon,
  };
};

export const ensureElements = async (
  {
    modal,
    closeButton,
    title,
    icon,
  }: {
    modal: Element;
    closeButton: Element;
    title: HTMLElement;
    icon: Element | null;
  },
  args: ModalProps
) => {
  await expect(modal).toBeTruthy();
  await expect(modal.getAttribute('data-open')).toBe('');
  await expect(closeButton).toBeTruthy();
  if (args.title) {
    await expect(title.innerText || title.textContent).toBe(args.title);
  } else {
    await expect(title).toBeFalsy();
  }
  await expect(modal.textContent).toContain('Some random content');
  if (args.variant === 'alert') {
    await expect(icon).toBeTruthy();
  } else {
    await expect(icon).toBeFalsy();
  }
};

export const modalInteractions = async (
  { closeButton, modal }: { modal: Element; closeButton: Element },
  onClose: () => void
) => {
  await act(async () => {
    await userEvent.click(closeButton);
  });
  await act(async () => {
    await userEvent.click(modal);
  });
  await expect(onClose).toBeCalledTimes(2);
};
