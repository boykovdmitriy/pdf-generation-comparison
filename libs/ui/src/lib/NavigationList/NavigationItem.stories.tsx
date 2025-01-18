import type { Meta, StoryObj } from '@storybook/react';
import { NavigationItem } from './NavigationList';

import { ensureNavigationItem, getNavigationItem } from './shared-spec';

const meta: Meta<typeof NavigationItem> = {
  component: NavigationItem,
  title: 'Navigation/NavigationItem',
};
export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const Primary: Story = {
  args: {
    title: 'Navigation title',
    href: '/section/url',
  },
  play: async ({ canvasElement, args }) => {
    const { link } = getNavigationItem(canvasElement);
    await ensureNavigationItem(link, args);
  },
};

export const Disabled: Story = {
  args: {
    title: 'Navigation title',
    href: '/section/url',
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const { link } = getNavigationItem(canvasElement);
    await ensureNavigationItem(link, args);
  },
};
