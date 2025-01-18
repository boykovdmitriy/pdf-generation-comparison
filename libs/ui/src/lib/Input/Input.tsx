'use client';
import React, { HTMLInputTypeAttribute, useCallback, useState } from 'react';
import cx from 'classnames';
import { Input as HeadlessInput } from '@headlessui/react';

export type InputProps = {
  name?: string;
  label?: string;
  onChange: (e: React.ChangeEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  type?: HTMLInputTypeAttribute;
  error?: string;
  value?: string | number;
  className?: string;
};

export const Input = React.forwardRef<HTMLElement, InputProps>(
  (
    {
      name,
      label,
      value = '',
      onChange,
      type,
      error,
      onFocus,
      onBlur,
      className,
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = useCallback(
      (e: React.FocusEvent) => {
        setFocused(true);
        if (onFocus) onFocus(e);
      },
      [onFocus]
    );
    const handleBlur = useCallback(
      (e: React.FocusEvent) => {
        setFocused(false);
        if (onBlur) onBlur(e);
      },
      [onBlur]
    );

    const active = value !== '' || focused;
    return (
      <div className={cx('pt-3 pb-5 relative', className)}>
        <div
          className={cx(
            'relative border rounded text-black border-opacity-25',
            error ? 'bg-red-200 border-red-500' : 'bg-slate-50 border-slate-950'
          )}
        >
          <HeadlessInput
            ref={ref}
            className={cx(
              'outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-3',
              error && 'text-red-700'
            )}
            id={name}
            value={value}
            name={name}
            type={type}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label
            className={cx(
              active ? 'text-xs bg-white py-[1px] px-[3px]' : 'text-sm',
              error ? 'text-red-900 text-opacity-95' : 'text-slate-950',
              'absolute rounded left-[12px] top-[12px] flex items-center text-opacity-50 transition-all duration-200 ease-in-out'
            )}
            style={{
              top: active ? '-11px' : undefined,
            }}
            htmlFor={name}
          >
            {label}
          </label>
        </div>
        {error && error !== '' && (
          <span
            data-error={name}
            className="text-xs text-red-700 absolute bottom-1 left-3"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
