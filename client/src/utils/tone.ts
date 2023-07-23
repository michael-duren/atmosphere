// convert from 0-1 to 0-22000
export const toFrequency = (num: number) => Math.round(num * 22000);

// expects num to be in frequency range
export const formatFrequency = (num: number): string => {
  if (num > 1000) {
    return `${(num / 1000).toFixed(1)}khz`;
  }
  return `${num}hz`;
};

export const toQuad = (num: number): number => {
  // apply a quadratic transform
  if (num <= 0.5) {
    return num;
  }
  return num * 100;
};
