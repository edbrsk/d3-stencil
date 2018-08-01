export const circularFind = (
  array: string[] | number[],
  index: number
): string | number => {
  const remainder: number = index % array.length;
  return array[remainder === 0 ? 0 : remainder];
};
