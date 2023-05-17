export const getComputedClassName = (...classNames: (string | undefined | null | false | 0)[]) => {
  return classNames
    .filter(Boolean)
    .filter((className) => (className as string)?.trim().length)
    .map((className) => className?.toString().trim())
    .join(' ');
};
