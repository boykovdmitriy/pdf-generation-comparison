import { TypographyProps } from './Typography';
import { containsClasses } from '../../testUtils/containsClasses';
import { expect } from '@storybook/jest';

export const getElement = (
  base: HTMLElement,
  variant: TypographyProps['variant']
) => {
  const tagName = getTagName(variant);
  return base.getElementsByTagName(tagName)[0];
};
const getTagName = (variant: TypographyProps['variant']) => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'body':
      return 'p';
    case 'caption':
      return 'span';
    default:
      return 'p';
  }
};

export const ensureCorrectProps = async (
  element: HTMLElement,
  args: Partial<TypographyProps>
) => {
  await expect(element).toBeTruthy();
  await expect(element.tagName).toBe(getTagName(args.variant).toUpperCase());
  await expect(element.textContent || element.innerText).toBe(args.children);
};

export const ensureCorrectColor = async (
  element: HTMLElement,
  args: Partial<TypographyProps>
) => {
  const getColor = (color: TypographyProps['color']) => {
    switch (color) {
      case 'secondary':
        return 'text-blue-700';
      case 'warning':
        return 'text-red-700';
      case 'primary':
      default:
        return 'text-gray-700';
    }
  };
  await expect(
    containsClasses(getColor(args.color), element.classList)
  ).toBeTruthy();
};

export const ensureCorrectSize = async (
  element: HTMLElement,
  args: Partial<TypographyProps>
) => {
  const getSize = (size: TypographyProps['variant']) => {
    switch (size) {
      case 'h1':
        return 'text-3xl';
      case 'h2':
        return 'text-2xl';
      case 'caption':
        return 'text-xs';
      case 'body':
      default:
        return 'text-lg';
    }
  };
  await expect(
    containsClasses(getSize(args.variant), element.classList)
  ).toBeTruthy();
};
