export const getKnobWidth = (windowWidth: number): number => {
  if (windowWidth > 1536) {
    return 24;
  }
  return 20;
};
