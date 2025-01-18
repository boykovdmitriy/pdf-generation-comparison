import { within } from '@storybook/test';
import React from 'react';
import { NavigationItemProps, NavigationSectionProps } from './NavigationList';
import { expect } from '@storybook/jest';
import { containsClasses } from '../../testUtils/containsClasses';

export const getNavigation = async (
  canvasElement: HTMLElement
): Promise<{ nav: HTMLElement }> => {
  const screen = within(canvasElement);
  const nav = screen.getByRole('navigation');

  return {
    nav,
  };
};

export const ensureNavigation = async (
  nav: HTMLElement,
  args: { children: React.ReactNode }
) => {
  await expect(nav.innerText || nav.textContent).toBe(args.children);
};

export const getSectionElements = (
  canvasElement: HTMLElement
): { title: HTMLElement; items: HTMLCollectionOf<HTMLElement> } => {
  const canvas = within(canvasElement);
  const title = canvas.getByTestId('title');
  const items = canvasElement.getElementsByTagName('li');
  return {
    title,
    items,
  };
};

export const ensureNavSection = async (
  {
    title,
    items,
  }: { title: HTMLElement; items: HTMLCollectionOf<HTMLElement> },
  args: NavigationSectionProps
) => {
  await expect(title.innerText ?? title.textContent).toBe(args.title);
  await expect(items.length).toBe(2);
};

export const getNavigationItem = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole('link');
  return { link };
};

export const ensureNavigationItem = async (
  link: HTMLElement,
  args: NavigationItemProps
) => {
  await expect(link).toBeTruthy();
  await expect(link.textContent ?? link.innerText).toBe(args.title);
  await expect(link.getAttribute('href')).toBe(args.href);
  if (args.disabled) {
    await expect(
      containsClasses('pointer-events-none', link.classList)
    ).toBeTruthy();
  } else {
    await expect(
      containsClasses('pointer-events-none', link.classList)
    ).toBeFalsy();
  }
};
