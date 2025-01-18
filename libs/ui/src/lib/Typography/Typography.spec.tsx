import { render } from '@testing-library/react';

import Typography, { TypographyProps } from './Typography';
import {
  ensureCorrectColor,
  ensureCorrectProps,
  ensureCorrectSize,
  getElement,
} from './shared-spec';
import { composeStories } from '@storybook/nextjs';
import * as stories from './Typography.stories';

const { H1, H2, Body, Caption } = composeStories(stories);

const testUnit = (args: Partial<TypographyProps>) => {
  it('Children Passed correctly', async () => {
    const { baseElement } = render(
      <Typography {...args}>{args.children}</Typography>
    );
    const element = getElement(baseElement, args.variant);
    await ensureCorrectProps(element, args);
  });
  it('Correct color', async () => {
    const { baseElement } = render(
      <Typography {...args}>{args.children}</Typography>
    );
    const element = getElement(baseElement, args.variant);
    await ensureCorrectColor(element, args);
  });
  it('Correct text size', async () => {
    const { baseElement } = render(
      <Typography {...args}>{args.children}</Typography>
    );
    const element = getElement(baseElement, args.variant);
    await ensureCorrectSize(element, args);
  });
};

describe('Typography', () => {
  describe('H1', () => {
    describe('Primary Color', async () => {
      testUnit(H1.args);
    });
    describe('Secondary Color', async () => {
      testUnit({
        ...H1.args,
        color: 'secondary',
      });
    });
    describe('Warning Color', async () => {
      testUnit({
        ...H1.args,
        color: 'warning',
      });
    });
  });
  describe('H2', () => {
    describe('Primary Color', async () => {
      testUnit(H2.args);
    });
    describe('Secondary Color', async () => {
      testUnit({
        ...H2.args,
        color: 'secondary',
      });
    });
    describe('Warning Color', async () => {
      testUnit({
        ...H2.args,
        color: 'warning',
      });
    });
  });
  describe('body', () => {
    describe('Primary Color', async () => {
      testUnit(Body.args);
    });
    describe('Secondary Color', async () => {
      testUnit({
        ...Body.args,
        color: 'secondary',
      });
    });
    describe('Warning Color', async () => {
      testUnit({
        ...Body.args,
        color: 'warning',
      });
    });
  });
  describe('caption', () => {
    describe('Primary Color', async () => {
      testUnit(Caption.args);
    });
    describe('Secondary Color', async () => {
      testUnit({
        ...Caption.args,
        color: 'secondary',
      });
    });
    describe('Warning Color', async () => {
      testUnit({
        ...Caption.args,
        color: 'warning',
      });
    });
  });
});
