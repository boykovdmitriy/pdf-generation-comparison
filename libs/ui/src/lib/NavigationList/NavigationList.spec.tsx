import { render } from '@testing-library/react';
import {
  NavigationItem,
  NavigationList,
  NavigationSection,
} from './NavigationList';
import {
  ensureNavigation,
  ensureNavigationItem,
  ensureNavSection,
  getNavigation,
  getNavigationItem,
  getSectionElements,
} from './shared-spec';

describe('NavigationList', () => {
  it('Renders correctly', async () => {
    const args = { children: 'text' };
    const { baseElement } = render(
      <NavigationList>{args.children}</NavigationList>
    );
    const { nav } = await getNavigation(baseElement);
    await ensureNavigation(nav, args);
  });
});

describe('NavigationSection', () => {
  it('Renders correctly', async () => {
    const args = {
      title: 'Section title',
      children: (
        <>
          <NavigationItem title="first" href="/first" />
          <NavigationItem title="second" href="/second" />
        </>
      ),
    };
    const { baseElement } = render(
      <NavigationSection title={args.title}>{args.children}</NavigationSection>
    );
    const elements = getSectionElements(baseElement);
    await ensureNavSection(elements, args);
  });
});

describe('NavigationItem', () => {
  it('Enabled Renders correctly', async () => {
    const args = {
      title: 'Navigation title',
      href: '/section/url',
    };
    const { baseElement } = render(<NavigationItem {...args} />);
    const { link } = getNavigationItem(baseElement);
    await ensureNavigationItem(link, args);
  });

  it('Disabled Renders correctly', async () => {
    const args = {
      title: 'Navigation title',
      href: '/section/url',
      disabled: true,
    };
    const { baseElement } = render(<NavigationItem {...args} />);
    const { link } = getNavigationItem(baseElement);
    await ensureNavigationItem(link, args);
  });
});
