import { render } from '@testing-library/react';

import Container from './Container';
import { composeStories } from '@storybook/nextjs';
import * as stories from './Container.stories';
import { expect } from '@storybook/jest';

const { Primary } = composeStories(stories);

describe('Container', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <Container>{Primary.args.children}</Container>
    );

    await expect(baseElement?.innerText || baseElement?.textContent).toBe(
      Primary.args?.children
    );
  });
});
