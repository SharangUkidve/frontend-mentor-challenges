export const coerceArray = <T>(a: T | T[] | null | undefined): T[] => (Array.isArray(a) ? a : a ? [a] : []);

export const joinArrayWithCommaSpace = (a: any[]): string => {
  return a.join(', ');
};

export const joinArrayWithComma = (a: any[]): string => {
  return a.join(',');
};
