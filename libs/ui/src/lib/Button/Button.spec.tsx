import { render } from '@testing-library/react';
import Button from './Button';
import { composeStories } from '@storybook/nextjs';
import * as stories from './Button.stories';
import React, { ComponentProps } from 'react';
import {
  ensureElements,
  getElements,
  mouseInteractions,
} from './Button.shared-spec';

const { Primary, Secondary, Warning, Disabled } = composeStories(stories);
type ArgsProps = ComponentProps<typeof Button>;

const buttonTestSuite = (args: Partial<ArgsProps>) => {
  it('should have properly configured attributes', async () => {
    const { baseElement } = render(
      <Button {...args}>{args?.children || 'not provided'}</Button>
    );
    const elements = await getElements(baseElement);
    await ensureElements(elements, args);
    await mouseInteractions(elements, args);
  });
  it(
    args.disabled
      ? 'should not respond to mouse interaction'
      : 'should respond to mouse interaction',
    async () => {
      const { baseElement } = render(
        <Button {...args}>{args?.children || 'not provided'}</Button>
      );
      const elements = await getElements(baseElement);
      await mouseInteractions(elements, args);
    }
  );
};

describe('Button', () => {
  describe('Primary', async () => {
    buttonTestSuite(Primary.args);
  });
  describe('Secondary', async () => {
    buttonTestSuite(Secondary.args);
  });
  describe('Warning', async () => {
    buttonTestSuite(Warning.args);
  });
  describe('Disabled', async () => {
    buttonTestSuite(Disabled.args);
  });
});
