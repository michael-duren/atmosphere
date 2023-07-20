export const splitCamelCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const toTitleCase = (str: string) => {
  return str
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};
