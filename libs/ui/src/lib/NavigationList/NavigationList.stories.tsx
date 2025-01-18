import type { Meta, StoryObj } from '@storybook/react';
import { NavigationList } from './NavigationList';

import { ensureNavigation, getNavigation } from './shared-spec';

const meta: Meta<typeof NavigationList> = {
  component: NavigationList,
  title: 'Navigation/NavigationList',
};
export default meta;
type Story = StoryObj<typeof NavigationList>;

export const Primary: Story = {
  args: {
    children: 'Text',
  },
  play: async ({ canvasElement, args }) => {
    const { nav } = await getNavigation(canvasElement);
    await ensureNavigation(nav, args);
  },
};
