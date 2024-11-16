export const computeX = (
  dims: [number, number],
  margins: [number, number],
  xRange: [number, number],
  date: number
): number => {
  return (
    dims[0] * margins[0] +
    (1 - margins[0]) *
      (((date - xRange[0]) / (xRange[1] - xRange[0])) * dims[0])
  );
};

export const computeY = (
  dims: [number, number],
  margins: [number, number],
  yRange: [number, number],
  val: number
): number => {
  return (
    (1 - margins[0] - margins[1]) *
    (dims[1] * margins[0] +
      (dims[1] - ((val - yRange[0]) / (yRange[1] - yRange[0])) * dims[1]))
  );
};
