import dayjs from "dayjs";
import { Account } from "./processor";

const computeXLabels = (
  xRange: [number, number]
): [number[], [number, number][]] => {
  const years: number[] = [];
  const months: [number, number][] = [];
  const earliest = dayjs(xRange[0] * 1000).startOf("month");
  const latest = dayjs(xRange[1] * 1000).startOf("month");
  let y = earliest.year();
  while (y <= latest.year()) {
    years.push(y);
    y++;
  }

  let m = earliest;
  while (m.unix() <= latest.unix()) {
    months.push([m.year(), m.month()]);
    m = m.add(1, "month");
  }
  return [years, months];
};

const possibleSteps = [
  1, 3, 10, 30, 100, 300, 1000, 3000, 10000, 30000, 100000, 300000, 1000000,
  3000000,
];

export interface Point {
  date: number;
  value: number;
}

export interface Line {
  name: string;
  color: string;
  points: Point[];
}

export interface Graph {
  dims: [number, number];
  xMargins: [number, number];
  yMargins: [number, number];
  xRange: [number, number];
  yRange: [number, number];
  yLabels: number[];
  xYearsLabels: number[];
  xMonthslabels: [number, number][];

  lines: Line[];
}

export const computeGraphMeta = (
  allLines: Account[],
  visibleAccounts: Record<string, boolean>
): Graph => {
  const lines = allLines.filter((l) => visibleAccounts[l.name]);

  const minX = lines.reduce(
    (acc, c) =>
      Math.min(
        c.points.reduce((acc, c) => Math.min(acc, c.date), 1e99),
        acc
      ),
    1e99
  );

  const maxX = lines.reduce(
    (acc, c) =>
      Math.max(
        c.points.reduce((acc, c) => Math.max(acc, c.date), 0),
        acc
      ),
    0
  );

  const minY = lines.reduce(
    (acc, c) =>
      Math.min(
        c.points.reduce((acc, c) => Math.min(acc, c.value), 1e99),
        acc
      ),
    1e99
  );
  const maxY = lines.reduce(
    (acc, c) =>
      Math.max(
        c.points.reduce((acc, c) => Math.max(acc, c.value), 0),
        acc
      ),
    0
  );

  const dims: [number, number] = [1200, 700];
  const xMargins: [number, number] = [0.05, 0];
  const yMargins: [number, number] = [0.1, 0.005];
  const xRange: [number, number] = [minX, maxX];
  const yRange: [number, number] = [minY, maxY];

  const step =
    possibleSteps.find((s) => s > (yRange[1] - yRange[0]) / 10) ?? 1000;

  const yLabels: number[] = [];

  let i = 0;
  while (i * step < yRange[1]) {
    yLabels.push(i * step);
    i++;
  }
  yLabels.push(i * step);
  yRange[1] = i * step;
  if (yRange[0] < 0) {
    i = -1;
    while (i * step > yRange[0]) {
      yLabels.push(i * step);
      i--;
    }
    yLabels.push(i * step);
    yRange[0] = i * step;
  }

  const [xYearsLabels, xMonthslabels] = computeXLabels(xRange);

  return {
    dims: dims,
    xMargins: xMargins,
    yMargins: yMargins,
    xRange: xRange,
    yRange: yRange,
    yLabels: yLabels,
    xYearsLabels: xYearsLabels,
    xMonthslabels: xMonthslabels,

    lines: lines,
  };
};
