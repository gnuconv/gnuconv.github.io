import { Graph } from "./graph";
import { computeY } from "./utils";

interface XAxisProps {
  graph: Graph;
}

export const XAxis = ({ graph }: XAxisProps) => {
  const { dims, xMargins, yMargins, xRange } = graph;
  const heightOfBalanceZero = computeY(dims, yMargins, xRange, 0);
  if (heightOfBalanceZero < 0 || heightOfBalanceZero > dims[1]) return <></>;

  return (
    <>
      <path
        /* horizontal axis */
        stroke="white"
        strokeWidth={2}
        d={`M${xMargins[0] * dims[0]},${heightOfBalanceZero} L${
          dims[0]
        },${heightOfBalanceZero}`}
      />
    </>
  );
};
