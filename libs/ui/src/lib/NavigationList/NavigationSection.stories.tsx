import type { Meta, StoryObj } from '@storybook/react';
import { NavigationItem, NavigationSection } from './NavigationList';

import { ensureNavSection, getSectionElements } from './shared-spec';

const meta: Meta<typeof NavigationSection> = {
  component: NavigationSection,
  title: 'Navigation/NavigationSection',
};
export default meta;
type Story = StoryObj<typeof NavigationSection>;

export const Primary: Story = {
  args: {
    title: 'Section title',
    children: (
      <>
        <NavigationItem title="first" href="/first" />
        <NavigationItem title="second" href="/second" />
      </>
    ),
  },
  play: async ({ canvasElement, args }) => {
    const elements = getSectionElements(canvasElement);
    await ensureNavSection(elements, args);
  },
};
