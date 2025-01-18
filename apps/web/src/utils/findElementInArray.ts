export const findElementInArray = (source: Array<string>, element: string) => {
  return source.find(
    (x) => x.toLocaleLowerCase() === element.toLocaleLowerCase()
  );
};
