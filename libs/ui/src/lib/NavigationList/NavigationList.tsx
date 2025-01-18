import React from 'react';
import Link, { LinkProps } from 'next/link';
import { Typography } from '../Typography';
import cx from 'classnames';

export type NavigationListProps = {
  children: React.ReactNode;
};

export type NavigationSectionProps = {
  title: string;
  children: React.ReactNode;
};

export type NavigationItemProps = {
  title: string;
  href: LinkProps['href'];
  disabled?: boolean;
};

export const NavigationItem = ({
  title,
  href,
  disabled,
}: NavigationItemProps) => {
  return (
    <li className="list-none">
      <Typography color="secondary">
        <Link
          className={cx(
            'hover:underline',
            disabled && 'pointer-events-none opacity-70'
          )}
          href={href}
        >
          {title}
        </Link>
      </Typography>
    </li>
  );
};

export const NavigationSection = ({
  children,
  title,
}: NavigationSectionProps) => {
  return (
    <div>
      <Typography data-testid="title" className="mb-2" variant="body">
        {title}
      </Typography>
      <ul className="space-y-1 list-none pl-5">{children}</ul>
    </div>
  );
};

export function NavigationList({ children }: NavigationListProps) {
  return <nav className="flex flex-col">{children}</nav>;
}
