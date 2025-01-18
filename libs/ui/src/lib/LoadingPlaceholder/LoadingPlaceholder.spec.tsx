import { render } from '@testing-library/react';
import { LoadingPlaceholder } from './LoadingPlaceholder';

describe('LoadingPlaceholder', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<LoadingPlaceholder />);
    expect(baseElement).toBeTruthy();
  });
});
