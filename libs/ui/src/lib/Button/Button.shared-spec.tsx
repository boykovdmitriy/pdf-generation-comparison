import { within, userEvent, Mock } from '@storybook/test';
import { ComponentProps } from 'react';
import Button, { __testClasses } from './Button';
import { expect } from '@storybook/jest';
import { containsClasses } from '../../testUtils/containsClasses';

type Elements = { button: HTMLElement | null; screen: any };

export const getElements = async (
  canvasElement: HTMLElement
): Promise<Elements> => {
  const screen = within(canvasElement);

  const button = await screen.queryByRole('button');

  return {
    screen,
    button,
  };
};

type ArgsProps = ComponentProps<typeof Button>;

export const mouseInteractions = async (
  elements: Elements,
  args: Partial<ArgsProps>
) => {
  const { button } = elements;
  if (!button) {
    await expect(true).toBe(false);
    return;
  }
  await userEvent.click(button);
  if (args.disabled) {
    await expect(args.onClick).not.toHaveBeenCalled();
  } else {
    await expect(args.onClick).toHaveBeenCalled();
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }

  await (args.onClick as Mock).mockClear();
  await button.blur();
};

export const ensureElements = async (
  elements: Elements,
  args: Partial<ArgsProps>
) => {
  const { button } = elements;
  await expect(button).toBeTruthy();
  await expect(button?.innerText || button?.textContent).toBe(args?.children);
  await expect(button?.getAttribute('type')).toBe(args?.type);
  if (args.size === 'small') {
    await expect(
      containsClasses(__testClasses.smallClasses, button?.classList)
    ).toBeTruthy();
  }
  if (args.size === 'full') {
    await expect(
      containsClasses(__testClasses.fullClasses, button?.classList)
    ).toBeTruthy();
  }
  if (args.size === 'normal') {
    await expect(
      containsClasses(__testClasses.normalClasses, button?.classList)
    ).toBeTruthy();
  }
  if (args.variant === 'primary') {
    await expect(
      containsClasses(__testClasses.primaryClasses, button?.classList)
    ).toBeTruthy();
  }
  if (args.variant === 'secondary') {
    await expect(
      containsClasses(__testClasses.secondaryClasses, button?.classList)
    ).toBeTruthy();
  }
  if (args.variant === 'warning') {
    await expect(
      containsClasses(__testClasses.warningClasses, button?.classList)
    ).toBeTruthy();
  }
};
