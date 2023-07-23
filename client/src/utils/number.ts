export const round = (num: number): number =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const bottomRange = (num: number) => {
  if (num < -20) {
    return -Infinity;
  }
  return num;
};
