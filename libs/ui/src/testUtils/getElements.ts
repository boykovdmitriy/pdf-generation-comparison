import { within } from '@storybook/test';
import { ByRoleMatcher } from '@testing-library/dom/types/matches';

export type ResultElements = { element: HTMLElement | null; screen: any };

export const getElements = async (
  canvasElement: HTMLElement,
  targetRole: ByRoleMatcher
): Promise<ResultElements> => {
  const screen = within(canvasElement);

  const element = await screen.queryByRole(targetRole);

  return {
    screen,
    element,
  };
};
