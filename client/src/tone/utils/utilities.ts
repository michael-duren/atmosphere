export const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const modulo = (a: number, b: number): number => {
  return ((a % b) + b) % b;
};
