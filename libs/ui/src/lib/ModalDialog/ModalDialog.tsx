'use client';

import React from 'react';
import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { Typography } from '../Typography';
import { IoWarning } from 'react-icons/io5';

export type ModalProps = {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
  open?: boolean;
  variant?: 'normal' | 'alert';
};
export function ModalDialog({
  variant = 'normal',
  onClose,
  open,
  title,
  children,
}: ModalProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-full sm:max-w-md md:max-w-2xl bg-white p-4 rounded relative">
          {variant === 'alert' && (
            <section
              data-type="warning-icon"
              className="flex justify-center mb-3"
            >
              <IoWarning size="3rem" className="fill-red-700" />
            </section>
          )}
          {title && (
            <DialogTitle
              as={Typography}
              variant="h1"
              color={variant === 'normal' ? 'primary' : 'warning'}
              className="mx-6 mb-4 text-center text-ellipsis text-nowrap overflow-hidden"
            >
              {title}
            </DialogTitle>
          )}
          <CloseButton
            data-type="close"
            className="absolute top-4 right-4 rounded-xl hover:bg-slate-300"
          >
            <CloseIcon />
          </CloseButton>
          <section className="space-y-4">{children}</section>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
