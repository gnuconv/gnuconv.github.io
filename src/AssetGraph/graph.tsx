import dayjs from "dayjs";
import type { Account } from "./processor";

const msToNs = 1000;

const computeXLabels = (
  xRange: [number, number]
): [dayjs.Dayjs[], dayjs.Dayjs[]] => {
  const years: dayjs.Dayjs[] = [];
  const months: dayjs.Dayjs[] = [];
  const earliest = dayjs(xRange[0] * msToNs);
  const latest = dayjs(xRange[1] * msToNs);
  let y = earliest.startOf("year");
  while (y.isBefore(latest)) {
    years.push(y);
    y = y.add(1, "year");
  }
  years.push(y);

  let m = earliest.startOf("month");
  while (m.isBefore(latest)) {
    months.push(m);
    m = m.add(1, "month");
  }
  months.push(m);

  return [years, months];
};

const partials = [1, 2, 3, 5];

const computeStep = (yRange: [number, number]): number => {
  const tenthScale = (yRange[1] - yRange[0]) / 10;
  let i = 0;

  while (true) {
    const pow = Math.pow(10, i);
    for (const partial of partials) {
      const step = pow * partial;
      if (step > tenthScale) return step;
    }
    i++;
  }
};

const computeYLabels = (yRange: [number, number]): number[] => {
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
  return yLabels;
};

export type Point = {
  date: number;
  value: number;
};

export type Line = {
  name: string;
  color: string;
  points: Point[];
};

export type Graph = {
  dims: [number, number];
  xMargins: [number, number];
  yMargins: [number, number];
  xRange: [number, number];
  yRange: [number, number];
  yLabels: number[];
  xYearsLabels: dayjs.Dayjs[];
  xMonthslabels: dayjs.Dayjs[];

  lines: Line[];
};

const reduceLines = (
  lines: Account[],
  f: typeof Math.min,
  a: (p: Point) => number,
  initial: number
): number =>
  lines.reduce(
    (acc0, c0) =>
      f(
        c0.points.reduce((acc1, c1) => f(acc1, a(c1)), initial),
        acc0
      ),
    initial
  );

export const computeGraph = (
  allLines: Account[],
  visibleAccounts: Record<string, boolean>
): Graph => {
  const lines = allLines.filter((l) => visibleAccounts[l.name]);

  const xRange: [number, number] = [
    reduceLines(lines, Math.min, (c) => c.date, Infinity),
    reduceLines(lines, Math.max, (c) => c.date, 0),
  ];

  const yRange: [number, number] = [
    reduceLines(lines, Math.min, (c) => c.value, Infinity),
    reduceLines(lines, Math.max, (c) => c.value, 0),
  ];

  const [xYearsLabels, xMonthslabels] = computeXLabels(xRange);

  return {
    dims: [1200, 700],
    xMargins: [0.05, 0],
    yMargins: [0.1, 0.005],
    xRange: xRange,
    yRange: yRange,
    yLabels: computeYLabels(yRange),
    xYearsLabels: xYearsLabels,
    xMonthslabels: xMonthslabels,

    lines: lines,
  };
};
