type Props = {
  name: string;
  y: number;
};
export const totalTemplate = ({ name, y }: Props) => {
  return [
    {
      name: `${name}Label`,
      type: 'text',
      content: 'Total:',
      position: {
        x: 127.5,
        y,
      },
      width: 20.13,
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
        x: 148.9,
        y,
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
      required: true,
      readOnly: false,
      fontName: 'NotoSerifJP-Regular',
    },
  ];
};
