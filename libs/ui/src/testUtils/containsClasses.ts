export const containsClasses = (classes: string, classList?: DOMTokenList) => {
  return classes
    .split(' ')
    .map((x) => classList?.contains(x))
    .find((x) => x);
};
