import { useGraph } from "./GraphContext";
import { computeY } from "./utils";

export const YAxis = (): React.ReactElement => {
  const { dims, xMargins, yMargins, yRange } = useGraph();
  const y0 = computeY(dims, yMargins, yRange, yRange[0]);
  const y1 = computeY(dims, yMargins, yRange, yRange[1]);
  return (
    <path
      stroke="white"
      strokeWidth={2}
      d={`M${xMargins[0] * dims[0]},${y0} L${xMargins[0] * dims[0]},${y1}`}
    />
  );
};
