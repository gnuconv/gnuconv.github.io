import dayjs from "dayjs";
import type { Account } from "./processor";

const msToNs = 1000;

const computeXLabels = (
  xRange: [number, number]
): [number[], [number, number][]] => {
  const years: number[] = [];
  const months: [number, number][] = [];
  const earliest = dayjs(xRange[0] * msToNs).startOf("month");
  const latest = dayjs(xRange[1] * msToNs).startOf("month");
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

const defaultWidth = 1200;
const defaultHeight = 700;
const xMarginsStart = 0.05;
const xMarginsEnd = 0;
const yMarginsStart = 0.1;
const yMarginsEnd = 0.005;

const yAxisDivisions = 10;
const base10 = 10;
const triple = 3;

const computeStep = (yRange: [number, number]): number => {
  const tenthScale = (yRange[1] - yRange[0]) / yAxisDivisions;
  let i = 0;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
  while (true) {
    const step0 = Math.pow(base10, i);
    if (step0 > tenthScale) return step0;
    const step1 = triple * step0;
    if (step1 > tenthScale) return step1;
    i++;
  }
};

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
    (acc0, c0) =>
      Math.min(
        c0.points.reduce((acc1, c1) => Math.min(acc1, c1.date), Infinity),
        acc0
      ),
    Infinity
  );

  const maxX = lines.reduce(
    (acc0, c0) =>
      Math.max(
        c0.points.reduce((acc1, c1) => Math.max(acc1, c1.date), 0),
        acc0
      ),
    0
  );

  const minY = lines.reduce(
    (acc0, c0) =>
      Math.min(
        c0.points.reduce((acc1, c1) => Math.min(acc1, c1.value), Infinity),
        acc0
      ),
    Infinity
  );
  const maxY = lines.reduce(
    (acc0, c0) =>
      Math.max(
        c0.points.reduce((acc1, c1) => Math.max(acc1, c1.value), 0),
        acc0
      ),
    0
  );

  const dims: [number, number] = [defaultWidth, defaultHeight];
  const xMargins: [number, number] = [xMarginsStart, xMarginsEnd];
  const yMargins: [number, number] = [yMarginsStart, yMarginsEnd];
  const xRange: [number, number] = [minX, maxX];
  const yRange: [number, number] = [minY, maxY];

  const step = computeStep(yRange);

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
