import { useGraph } from "./GraphContext";
import { computeX } from "./utils";

const monthNames = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const textOffset = 12;

export const XMonthLabels = (): React.ReactElement => {
  const { dims, xMargins, yMargins, xRange, xMonthslabels } = useGraph();

  const min = computeX(dims, xMargins, xRange, xRange[0]);
  const max = computeX(dims, xMargins, xRange, xRange[1]);

  const monthsUnix = xMonthslabels.map((m) => m.unix());
  return (
    <>
      {xMonthslabels.slice(0, -1).map((m, i) => {
        const monthStart = computeX(dims, xMargins, xRange, monthsUnix[i]);
        const x0 = Math.max(min, monthStart);

        const monthEnd = computeX(dims, xMargins, xRange, monthsUnix[i + 1]);
        const x1 = Math.min(max, monthEnd);

        const mid = (x0 + x1) * 0.5;
        return (
          <text
            key={i}
            x={mid - textOffset}
            fill="white"
            y={dims[1] * yMargins[0] - 10}
          >
            {monthNames[m.month()]}
          </text>
        );
      })}
    </>
  );
};
