type Props = {
  name: string;
  y: number;
  render: boolean;
};
export const bottomSection = ({ name, y, render }: Props) => {
  if (!render) return [];

  return [
    {
      name: `${name}Label`,
      type: 'text',
      content: 'Notes:',
      position: {
        x: 10.34,
        y: y,
      },
      width: 45,
      height: 10,
      rotate: 0,
      alignment: 'left',
      verticalAlignment: 'top',
      fontSize: 13,
      lineHeight: 1,
      characterSpacing: 0,
      fontColor: '#000000',
      backgroundColor: '',
      opacity: 1,
      strikethrough: false,
      underline: false,
      required: false,
      readOnly: true,
    },
    {
      name: name,
      type: 'text',
      content: 'Type Something...',
      position: {
        x: 15.82,
        y: y + 8,
      },
      width: 45,
      height: 10,
      rotate: 0,
      alignment: 'left',
      verticalAlignment: 'top',
      fontSize: 13,
      lineHeight: 1,
      characterSpacing: 0,
      fontColor: '#000000',
      backgroundColor: '',
      opacity: 1,
      strikethrough: false,
      underline: false,
      required: false,
      readOnly: false,
    },
  ];
};
