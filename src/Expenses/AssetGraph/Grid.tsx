import { computeX, computeY } from "./utils";
import type { Graph } from "./graph";
import dayjs from "dayjs";

interface GridProps {
  graph: Graph;
}
const monthPadding = 2;

export const Grid = ({ graph }: GridProps): React.ReactElement => {
  const { dims, xMargins, yMargins, xRange, yRange, yLabels, xMonthslabels } =
    graph;
  return (
    <>
      {yLabels.map((a) => (
        <path
          key={a}
          stroke="#444"
          strokeWidth={2}
          d={`M${dims[0] * xMargins[0]},${computeY(
            dims,
            yMargins,
            yRange,
            a
          )} L${dims[0]},${computeY(dims, yMargins, yRange, a)}`}
        />
      ))}
      {xMonthslabels.map((m, i) => {
        const monthStart = dayjs(
          `${m[0]}-${(m[1] + 1 + "").padStart(monthPadding, "0")}`
        );

        const monthEnd = monthStart.add(1, "month");
        const x = computeX(dims, xMargins, xRange, monthEnd.unix());

        return (
          <path
            key={i}
            stroke="#444"
            d={`M${x},${computeY(
              dims,
              yMargins,
              yRange,
              yRange[1]
            )} L${x},${computeY(dims, yMargins, yRange, yRange[0])}`}
          />
        );
      })}
    </>
  );
};
