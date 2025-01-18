type Props = {
  name: string;
  y: number;
  items: number;
};

export const baseTableItemHeight = 17.9;

export const tableTemplate = ({ name, y, items }: Props) => {
  return {
    name: name,
    type: 'table',
    position: {
      x: 10,
      y: y,
    },
    width: 190,
    height: baseTableItemHeight * (items + 1),
    content: '',
    showHead: true,
    head: ['Item', 'Quantity', 'Rate', 'Total'],
    headWidthPercentages: [45, 15, 15, 25],
    tableStyles: {
      borderWidth: 0,
      borderColor: '#000000',
    },
    headStyles: {
      fontName: 'NotoSerifJP-Regular',
      fontSize: 13,
      characterSpacing: 0,
      alignment: 'left',
      verticalAlignment: 'middle',
      lineHeight: 1,
      fontColor: '#ffffff',
      borderColor: '',
      backgroundColor: '#0f0f0f',
      borderWidth: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      padding: {
        top: 3,
        right: 5,
        bottom: 3,
        left: 5,
      },
    },
    bodyStyles: {
      fontName: 'NotoSerifJP-Regular',
      fontSize: 13,
      characterSpacing: 0,
      alignment: 'left',
      verticalAlignment: 'middle',
      lineHeight: 1,
      fontColor: '#000000',
      borderColor: '#888888',
      backgroundColor: '',
      alternateBackgroundColor: '#f5f5f5',
      borderWidth: {
        top: 0.1,
        right: 0,
        bottom: 0,
        left: 0,
      },
      padding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
      },
    },
    columnStyles: {
      alignment: {
        '0': 'left',
        '1': 'center',
        '2': 'left',
        '3': 'right',
      },
    },
    required: false,
    readOnly: false,
  };
};
