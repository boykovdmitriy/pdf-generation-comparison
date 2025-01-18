import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Input } from '@pdf-generation-comparison/ui';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { FaPlus } from 'react-icons/fa';
import { IInvoice } from '../../types/invoice';

type Props = {
  onSubmit: (values: IInvoice) => void;
};

const RequiredRule = {
  required: 'Field is required',
  maxLength: { value: 30, message: 'Text is too big' },
};

export const InvoiceForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IInvoice>({
    defaultValues: {
      title: 'Invoice',
      invoiceId: '#12',
      from: 'Jones James',
      to: 'Peter Parker',
      date: 'Today',
      dueDate: 'Yesterday',
      items: [
        {
          title: 'Missed deadline fee',
          quantity: 3,
          rate: 150,
        },
        {
          title: 'Overtime compensation',
          quantity: 1,
          rate: 1000,
        },
      ],
      notes: "If you don't pay you're fired",
      terms: 'Pay in time',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const getErrorItemsErrorMessage = (
    index: number,
    modifier: 'title' | 'quantity' | 'rate'
  ) => {
    const itemsError = errors['items'];
    if (!itemsError) return undefined;
    return itemsError[index]?.[modifier]?.message;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end">
        <div className="max-w-sm">
          <Controller
            name="title"
            control={control}
            rules={RequiredRule}
            render={({ field }) => {
              return (
                <Input
                  label="title"
                  error={errors['title']?.message}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="invoiceId"
            control={control}
            rules={RequiredRule}
            render={({ field }) => (
              <Input
                label="Invoice Id"
                error={errors['invoiceId']?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="flex sm:justify-between sm:flex-row flex-col space-x-3">
        <div className="sm:max-w-md w-full">
          <Controller
            name="from"
            control={control}
            rules={RequiredRule}
            render={({ field }) => (
              <Input label="From" error={errors['from']?.message} {...field} />
            )}
          />
          <Controller
            name="to"
            control={control}
            rules={RequiredRule}
            render={({ field }) => (
              <Input error={errors['to']?.message} label="To" {...field} />
            )}
          />
        </div>
        <div className="sm:max-w-md w-full">
          <Controller
            name="date"
            control={control}
            rules={RequiredRule}
            render={({ field }) => (
              <Input error={errors['date']?.message} label="date" {...field} />
            )}
          />
          <Controller
            name="dueDate"
            control={control}
            rules={RequiredRule}
            render={({ field }) => (
              <Input
                error={errors['dueDate']?.message}
                label="dueDate"
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="flex p-1 border border-gray-600 flex-col space-y-2 rounded-md">
        {fields.map((field, index) => (
          <div
            key={field.title || index}
            className="flex px-2 items-center md:space-x-2 border-b border-gray-600 last-of-type:border-0 flex-col md:flex-row"
          >
            <Controller
              name={`items.${index}.title`}
              control={control}
              rules={RequiredRule}
              render={({ field }) => (
                <Input
                  error={getErrorItemsErrorMessage(index, 'title')}
                  label="title"
                  className="w-full"
                  {...field}
                />
              )}
            />
            <Controller
              name={`items.${index}.quantity`}
              control={control}
              rules={RequiredRule}
              render={({ field }) => (
                <Input
                  error={getErrorItemsErrorMessage(index, 'quantity')}
                  label="quantity"
                  className="w-full md:w-[80px] md:w-min-[80px] flex-shrink-0"
                  {...field}
                  type="number"
                />
              )}
            />
            <Controller
              name={`items.${index}.rate`}
              control={control}
              rules={RequiredRule}
              render={({ field }) => (
                <Input
                  error={getErrorItemsErrorMessage(index, 'rate')}
                  label="rate"
                  className="w-full md:w-[100px] md:w-min-[100px] flex-shrink-0"
                  {...field}
                  type="number"
                />
              )}
            />
            <Button
              type="button"
              variant="warning"
              size="small"
              className="w-full mb-2 md:mb-0 md:w-min"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <CloseIcon />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="primary"
          size="small"
          onClick={() =>
            append({
              title: '',
              quantity: undefined,
              rate: undefined,
            })
          }
        >
          <FaPlus />
        </Button>
      </div>
      <Controller
        name="notes"
        control={control}
        render={({ field }) => <Input label="notes" {...field} />}
      />
      <Controller
        name="terms"
        control={control}
        render={({ field }) => <Input label="terms" {...field} />}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
