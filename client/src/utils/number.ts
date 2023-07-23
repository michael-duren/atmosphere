export const round = (num: number): number =>
  Math.round((num + Number.EPSILON) * 100) / 100;
