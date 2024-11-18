import type { Graph } from "./graph";
import { computeY } from "./utils";

interface XAxisProps {
  graph: Graph;
}

export const XAxis = ({ graph }: XAxisProps): React.ReactElement => {
  const { dims, xMargins, yMargins, yRange } = graph;
  const heightOfBalanceZero = computeY(dims, yMargins, yRange, 0);
  if (heightOfBalanceZero < 0 || heightOfBalanceZero > dims[1]) return <></>;

  return (
    <path
      stroke="#444"
      strokeWidth={4}
      d={`M${xMargins[0] * dims[0]},${heightOfBalanceZero} L${
        dims[0]
      },${heightOfBalanceZero}`}
    />
  );
};
