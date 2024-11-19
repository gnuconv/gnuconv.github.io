import { computeX, computeY } from "./utils";
import { useGraph } from "./GraphContext";

export const Grid = (): React.ReactElement => {
  const { dims, xMargins, yMargins, xRange, yRange, yLabels, xMonthslabels } =
    useGraph();
  return (
    <>
      {yLabels.map((a) => {
        const x0 = dims[0] * xMargins[0];
        const [x1] = dims;
        const y = computeY(dims, yMargins, yRange, a);
        return (
          <path
            key={a}
            stroke="#444"
            strokeWidth={2}
            d={`M${x0},${y} L${x1},${y}`}
          />
        );
      })}
      {xMonthslabels.slice(1, -1).map((m, i) => {
        const x = computeX(dims, xMargins, xRange, m.unix());
        const y0 = computeY(dims, yMargins, yRange, yRange[0]);
        const y1 = computeY(dims, yMargins, yRange, yRange[1]);
        return <path key={i} stroke="#444" d={`M${x},${y0} L${x},${y1}`} />;
      })}
    </>
  );
};
