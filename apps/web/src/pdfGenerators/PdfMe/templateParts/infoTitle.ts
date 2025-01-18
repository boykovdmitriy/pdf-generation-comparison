type Props = {
  name: string;
  y: number;
  position: 'right' | 'left';
};

export const infoTitle = ({ name, y, position }: Props) => {
  const x = position === 'left' ? 10.29 : 107.9;
  return [
    {
      name: `${name}Label`,
      type: 'text',
      content: 'Invoice From:',
      position: {
        x: x,
        y: y,
      },
      width: 45,
      height: 10,
      rotate: 0,
      alignment: 'left',
      verticalAlignment: 'top',
      fontSize: 15,
      lineHeight: 1,
      characterSpacing: 0,
      fontColor: '#686868',
      backgroundColor: '',
      opacity: 1,
      strikethrough: false,
      underline: false,
      required: false,
      readOnly: true,
      fontName: 'NotoSerifJP-Regular',
    },
    {
      name: name,
      type: 'text',
      content: 'Type Something...',
      position: {
        x: x + 38,
        y: y,
      },
      width: 45,
      height: 10,
      rotate: 0,
      alignment: position,
      verticalAlignment: 'top',
      fontSize: 15,
      lineHeight: 1,
      characterSpacing: 0,
      fontColor: '#000000',
      backgroundColor: '',
      opacity: 1,
      strikethrough: false,
      underline: false,
      required: true,
      readOnly: false,
    },
  ];
};
