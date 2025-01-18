import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function Container({ children }: Props) {
  return (
    <div className="mx-auto border-gray-200 border p-8 rounded sm:w-full md:w-2/3 md:max-w-2xl shadow-xl">
      {children}
    </div>
  );
}
