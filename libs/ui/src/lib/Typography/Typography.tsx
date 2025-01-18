import React, { useMemo } from 'react';
import cx from 'classnames';

export type TypographyProps = {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'warning';
  children: React.ReactNode;
  className?: string;
  ['data-testid']?: string;
};

export function Typography({
  variant = 'body',
  color = 'primary',
  children,
  className,
  ...rest
}: TypographyProps) {
  const Component = useMemo(() => {
    switch (variant) {
      case 'h1':
      case 'h2':
        return variant;
      case 'body':
        return 'p';
      case 'caption':
        return 'span';
      default:
        throw new Error(`Cannot process unknown typography variant ${variant}`);
    }
  }, [variant]);

  return (
    <Component
      className={cx(
        className,
        variant === 'h1' && 'text-3xl',
        variant === 'h2' && 'text-2xl',
        variant === 'body' && 'text-lg',
        variant === 'caption' && 'text-xs',
        color === 'primary' && 'text-gray-700',
        color === 'secondary' && 'text-blue-700',
        color === 'warning' && 'text-red-700'
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Typography;
