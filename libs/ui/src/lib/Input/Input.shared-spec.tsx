import { ComponentProps } from 'react';
import Input from './Input';
import { expect } from '@storybook/jest';
import { ResultElements } from '../../testUtils/getElements';
import { containsClasses } from '../../testUtils/containsClasses';
import { userEvent } from '@storybook/test';
import { act } from 'react';

type ArgsProps = ComponentProps<typeof Input>;

export const ensureElements = async (
  elements: ResultElements,
  args: Partial<ArgsProps>
) => {
  const { element } = elements;
  await expect(element).toBeTruthy();
  if (!element) {
    throw new Error('element does not exist');
  }
  const labels = await element.getElementsByTagName('label');
  await expect(labels?.length).toBe(1);
  if (!labels) {
    throw new Error('label does not exist');
  }
  const label = labels[0];
  await expect(label.innerText || label.textContent).toBe(args?.label);
  await expect(label.getAttribute('for')).toBe(args?.name);

  const inputs = await element.getElementsByTagName('input');
  await expect(inputs).toBeTruthy();
  await expect(inputs.length).toBe(1);
  const input = inputs[0];

  await expect(input.getAttribute('name')).toBe(args?.name);
  await expect(input.getAttribute('value')).toBe(args?.value || '');
  await expect(input.getAttribute('type')).toBe(args?.type);
  await expect(input.getAttribute('id')).toBe(args?.name);

  if (args?.value) {
    await expect(label.style.top).toBe('-11px');
  } else {
    await expect(label.style.top).toBeFalsy();
  }

  const error = await element?.querySelectorAll<HTMLElement>(
    `[data-error='${args.name}']`
  );

  if (args.error) {
    await expect(error.length).toBe(1);
    await expect(error[0].innerText || error[0]?.textContent).toBe(args.error);
    await expect(containsClasses('text-red-700', input.classList)).toBeTruthy();
    await expect(
      containsClasses('text-red-900 text-opacity-95', label.classList)
    ).toBeTruthy();
    await expect(
      containsClasses('ml-[13px] mt-2 text-sm text-red-700', error[0].classList)
    ).toBeTruthy();
  } else {
    await expect(error.length).toBe(0);
    await expect(containsClasses('text-red-700', input.classList)).toBeFalsy();
    await expect(
      containsClasses('text-red-900 text-opacity-95', label.classList)
    ).toBeFalsy();
  }
};

export const inputInteractions = async (
  { element }: ResultElements,
  args: Partial<ArgsProps>
) => {
  if (!element) {
    throw new Error('element does not exist');
  }
  const input = (await element.getElementsByTagName('input'))[0];
  const label = (await element.getElementsByTagName('label'))[0];

  await act(async () => {
    await input.focus();
  });
  await expect(label.style.top).toBe('-11px');
  await expect(input).toHaveFocus();
  if (args.onFocus) await expect(args.onFocus).toBeCalledTimes(1);

  const keyboardText = 'text';
  await act(async () => {
    await userEvent.keyboard(keyboardText);
  });
  if (args.onChange) await expect(args.onChange).toBeCalledTimes(4);

  await act(async () => {
    await input.blur(); // Set focus on the input
  });
  if (args.onBlur) await expect(args.onBlur).toBeCalledTimes(1);
  if (args.value) {
    await expect(label.style.top).toBe('-11px');
  } else {
    await expect(label.style.top).not.toBe('-11px');
  }
  await expect(input).not.toHaveFocus();
};
