import { render } from '@testing-library/react';

import Input, { InputProps } from './Input';
import { composeStories } from '@storybook/nextjs';
import * as stories from './Input.stories';
import React from 'react';

import { within } from '@storybook/testing-library';
import { ensureElements, inputInteractions } from './Input.shared-spec';

/*TODO: fix prettier max-line*/
const { Primary, Error, ErrorValue, PrimaryValue, InputWithNoCallbacks } =
  composeStories(stories);

const buttonTestSuite = (args: InputProps) => {
  it('should have properly configured attributes', async () => {
    const { baseElement } = render(<Input {...args} />);
    const screen = within(baseElement);

    await ensureElements({ element: baseElement, screen }, args);
  });
  it('should respond to interaction', async () => {
    const { baseElement } = render(<Input {...args} />);
    const screen = within(baseElement);
    await inputInteractions({ element: baseElement, screen }, args);
  });
};

describe('Input', () => {
  describe('Default state', () => {
    buttonTestSuite(Primary.args);
  });
  describe('Default state with Value', () => {
    buttonTestSuite(PrimaryValue.args);
  });
  describe('Error state', () => {
    buttonTestSuite(Error.args);
  });
  describe('Error state with Value', () => {
    buttonTestSuite(ErrorValue.args);
  });
  describe('Works correctly if no callbacks provided', () => {
    buttonTestSuite(InputWithNoCallbacks.args);
  });
});
