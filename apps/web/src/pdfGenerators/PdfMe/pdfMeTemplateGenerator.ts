import { BLANK_PDF, Template } from '@pdfme/common';
import { titleTemplate } from './templateParts/titleTemplate';
import { idTemplate } from './templateParts/idTemplate';
import { infoTitle } from './templateParts/infoTitle';
import {
  baseTableItemHeight,
  tableTemplate,
} from './templateParts/tableTemplate';
import { totalTemplate } from './templateParts/totalTemplate';
import { bottomSection } from './templateParts/bottomSection';

type Props = {
  items: number;
  hasTerms: boolean;
  hasNotes: boolean;
};

export const pdfMeTemplateGenerator = ({
  items,
  hasTerms,
  hasNotes,
}: Props): Template => {
  const tableLastY = 89 + (items + 1) * baseTableItemHeight;
  return {
    basePdf: BLANK_PDF,
    schemas: [
      [
        titleTemplate,
        idTemplate,
        ...infoTitle({
          name: 'from',
          y: 54,
          position: 'left',
        }),
        ...infoTitle({
          name: 'to',
          y: 65,
          position: 'left',
        }),
        ...infoTitle({
          name: 'date',
          y: 54,
          position: 'right',
        }),
        ...infoTitle({
          name: 'dueDate',
          y: 65,
          position: 'right',
        }),
        tableTemplate({
          name: 'invoiceItems',
          y: 89,
          items,
        }),
        ...totalTemplate({
          name: 'total',
          y: 89 + (items + 1) * baseTableItemHeight,
        }),
        ...bottomSection({
          name: 'notes',
          y: tableLastY + 40,
          render: hasNotes,
        }),
        ...bottomSection({
          name: 'terms',
          y: tableLastY + 40 + 40,
          render: hasTerms,
        }),
      ],
    ],
  };
};
