export const bottomRange = (num: number) => {
  if (num < -28) {
    return -Infinity;
  }
  return num;
};
