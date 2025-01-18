import React from 'react';
import cx from 'classnames';
import { Button as HeadlessButton } from '@headlessui/react';

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'warning';
  size?: 'full' | 'small' | 'normal';
  type?: 'submit' | 'button';
  className?: string;
  disabled?: boolean;
};
const smallClasses = 'px-3 py-2 text-sm';
const fullClasses = 'w-full px-5 py-3 text-base';
const normalClasses = 'px-5 py-3 text-base';
const secondaryClasses =
  'bg-white border-indigo-700 border hover:bg-indigo-200 active:bg-indigo-300 hover:border-indigo-800 text-indigo-700';
const warningClasses =
  'bg-red-600 hover:bg-red-400 active:bg-red-500 text-white';
const primaryClasses =
  'bg-indigo-600 hover:bg-indigo-400 text-white active:bg-indigo-500';
const disabledClasses = 'grayscale opacity-70 pointer-events-none';

export const __testClasses = {
  smallClasses,
  fullClasses,
  normalClasses,
  secondaryClasses,
  warningClasses,
  primaryClasses,
  disabledClasses,
};

export function Button({
  onClick,
  type = 'button',
  size = 'normal',
  variant = 'primary',
  children,
  className,
  disabled,
}: Props) {
  return (
    <HeadlessButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cx(
        className,
        size === 'small' && smallClasses,
        size === 'full' && fullClasses,
        size === 'normal' && normalClasses,
        variant === 'secondary' && secondaryClasses,
        variant === 'warning' && warningClasses,
        variant === 'primary' && primaryClasses,
        disabled && disabledClasses,
        'flex justify-center items-center rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      )}
    >
      {children}
    </HeadlessButton>
  );
}

export default Button;
