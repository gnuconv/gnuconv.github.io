import { GNUAccount, GNUTransaction } from "./chartUtils";
import { Box, Button } from "@mui/material";
import { Palette } from "./colors";
import { Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

interface Point {
  date: number;
  balance: number;
}

interface Account {
  name: string;
  points: Point[];
}

const computeAccountGraphPoint = (
  account: GNUAccount,
  transactions: GNUTransaction[]
): Account => {
  const accountTransaction = transactions
    .filter(
      (t) =>
        t.splits[0].account === account?.id ||
        t.splits[1].account === account?.id
    )
    .sort((a, b) => a.date - b.date);

  let balance = 0;
  const subTransactions = accountTransaction.map((t) => {
    if (t.splits[0].account === account?.id) {
      balance += t.splits[0].value;
    } else {
      balance += t.splits[1].value;
    }
    return {
      date: t.date,
      balance: balance,
    };
  });

  const points = [];

  for (let i = 0; i < subTransactions.length; i++) {
    if (subTransactions[i].date == subTransactions[i + 1]?.date) continue;
    points.push(subTransactions[i]);
  }

  return {
    name: account.name,
    points: points,
  };
};

const computeAllGraphPoints = (
  accounts: GNUAccount[],
  transactions: GNUTransaction[]
): Account[] => {
  const graphAccounts = accounts
    .filter((a) => ["ASSET", "CREDIT"].includes(a.type))
    .filter((a) =>
      transactions.some((t) => t.splits.some((s) => s.account === a.id))
    );

  const lines = graphAccounts.map((a) =>
    computeAccountGraphPoint(a, transactions)
  );

  return lines;
};

interface AssetGraphProps {
  accounts: GNUAccount[];
  transactions: GNUTransaction[];
}

// const unixToDate = (unix: number) => dayjs(unix * 1000).format("YYYY-MM-DD");

const computeX = (
  dims: [number, number],
  margins: [number, number],
  xRange: [number, number],
  date: number
) => {
  return (
    dims[0] * margins[0] +
    (1 - margins[0]) *
      (((date - xRange[0]) / (xRange[1] - xRange[0])) * dims[0])
  );
};

const computeY = (
  dims: [number, number],
  margins: [number, number],
  yRange: [number, number],
  val: number
) => {
  return (
    (1 - margins[0] - margins[1]) *
    (dims[1] * margins[0] +
      (dims[1] - ((val - yRange[0]) / (yRange[1] - yRange[0])) * dims[1]))
  );
};

const computeXAxis = (
  dateRange: [number, number]
): [number[], [number, number][]] => {
  const years: number[] = [];
  const months: [number, number][] = [];
  const earliest = dayjs(dateRange[0] * 1000).startOf("month");
  const latest = dayjs(dateRange[1] * 1000).startOf("month");
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

export const AssetGraph = ({ accounts, transactions }: AssetGraphProps) => {
  const allLines = useMemo(
    () => computeAllGraphPoints(accounts, transactions),
    []
  );
  const [visibleAccounts, setVisibleAccounts] = useState(
    allLines.map((a) => a.name)
  );

  const lines = allLines.filter((l) => visibleAccounts.includes(l.name));

  const earliest = lines.reduce(
    (acc, c) =>
      Math.min(
        c.points.reduce((acc, c) => Math.min(acc, c.date), 1e99),
        acc
      ),
    1e99
  );

  const latest = lines.reduce(
    (acc, c) =>
      Math.max(
        c.points.reduce((acc, c) => Math.max(acc, c.date), 0),
        acc
      ),
    0
  );

  const lowest = lines.reduce(
    (acc, c) =>
      Math.min(
        c.points.reduce((acc, c) => Math.min(acc, c.balance), 1e99),
        acc
      ),
    1e99
  );
  const highest = lines.reduce(
    (acc, c) =>
      Math.max(
        c.points.reduce((acc, c) => Math.max(acc, c.balance), 0),
        acc
      ),
    0
  );

  const dims: [number, number] = [1200, 700];
  const margins: [[number, number], [number, number]] = [
    [0.05, 0],
    [0.1, 0.005],
  ];
  const dateRange: [number, number] = [earliest, latest];
  const balanceRange: [number, number] = [lowest, highest];

  const balanceDiff = balanceRange[1] - balanceRange[0];

  const [years, months] = computeXAxis(dateRange);

  const possibleSteps = [
    1, 3, 10, 30, 100, 300, 1000, 3000, 10000, 30000, 100000, 300000, 1000000,
    3000000,
  ];
  const step = possibleSteps.find((s) => s > balanceDiff / 10) ?? 1000;

  const yAxis: number[] = [];

  let i = 0;
  while (i * step < balanceRange[1]) {
    yAxis.push(i * step);
    i++;
  }
  yAxis.push(i * step);
  balanceRange[1] = i * step;
  if (balanceRange[0] < 0) {
    i = -1;
    while (i * step > balanceRange[0]) {
      yAxis.push(i * step);
      i--;
    }
    yAxis.push(i * step);
    balanceRange[0] = i * step;
  }

  const zero = computeY(dims, margins[1], balanceRange, 0);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <svg
        width={dims[0]}
        height={dims[1]}
        style={{ backgroundColor: "#121212" }}
      >
        <path
          /* horizontal axis */
          stroke="white"
          strokeWidth={2}
          d={`M${margins[0][0] * dims[0]},${zero} L${dims[0]},${zero}`}
        />
        <path
          /* vertical axis */
          stroke="white"
          strokeWidth={2}
          d={`M${margins[0][0] * dims[0]},${computeY(
            dims,
            margins[1],
            balanceRange,
            balanceRange[0]
          )} L${margins[0][0] * dims[0]},${computeY(
            dims,
            margins[1],
            balanceRange,
            balanceRange[1]
          )}`}
        />
        {years.map((y, i) => {
          /* year labels */
          const min = computeX(dims, margins[0], dateRange, dateRange[0]);
          const start = computeX(
            dims,
            margins[0],
            dateRange,
            dayjs(`${y}-01-01`).unix()
          );

          const x0 = Math.max(min, start);
          let prev = <></>;
          if (i === 0) {
            prev = <path d={`M${x0},${0} L${x0},${15}`} stroke="white" />;
          }

          const max = computeX(dims, margins[0], dateRange, dateRange[1]);
          const end = computeX(
            dims,
            margins[0],
            dateRange,
            dayjs(`${y + 1}-01-01`).unix()
          );
          const x1 = Math.min(max, end);

          const mid = (x0 + x1) / 2;
          return (
            <Fragment key={i}>
              {prev}
              <text x={mid} y={15} fill="white">
                {y}
              </text>
              <path d={`M${x1},${0} L${x1},${15}`} stroke="white" />
            </Fragment>
          );
        })}
        {months.map((m, i) => {
          const names = [
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
          const min = computeX(dims, margins[0], dateRange, dateRange[0]);
          const max = computeX(dims, margins[0], dateRange, dateRange[1]);

          const monthStart = dayjs(
            `${m[0]}-${(m[1] + 1 + "").padStart(2, "0")}`
          );
          const x0 = Math.max(
            min,
            computeX(dims, margins[0], dateRange, monthStart.unix())
          );

          const monthEnd = monthStart.add(1, "month");
          const x1 = Math.min(
            max,
            computeX(dims, margins[0], dateRange, monthEnd.unix())
          );

          let prev = <></>;
          if (i === 0) {
            prev = <path stroke="white" d={`M${x0},${15} L${x0},${30}`} />;
          }

          const mid = (x0 + x1) / 2;
          return (
            <Fragment key={i}>
              {prev}
              <text x={mid - 12} fill="white" y={30}>
                {names[m[1]]}
              </text>
              <path stroke="white" d={`M${x1},${15} L${x1},${30}`} />
            </Fragment>
          );
        })}
        {yAxis.map((a) => (
          /* y axis labels */
          <Fragment key={a}>
            <path
              stroke="white"
              strokeWidth={2}
              d={`M${margins[0][0] * dims[0]},${computeY(
                dims,
                margins[1],
                balanceRange,
                a
              )} L${dims[0] * margins[0][0] * 0.5},${computeY(
                dims,
                margins[1],
                balanceRange,
                a
              )}`}
            />
            <text
              x={0}
              y={computeY(dims, margins[1], balanceRange, a) - 5}
              fill="white"
            >
              {a}
            </text>
          </Fragment>
        ))}
        {lines.map((line) =>
          line.points.map((p, i) => {
            const x = computeX(dims, margins[0], dateRange, p.date);
            const y = computeY(dims, margins[1], balanceRange, p.balance);
            let graphLine = <></>;
            if (i > 0) {
              const x2 = computeX(
                dims,
                margins[0],
                dateRange,
                line.points[i - 1].date
              );
              const y2 = computeY(
                dims,
                margins[1],
                balanceRange,
                line.points[i - 1].balance
              );
              graphLine = (
                <path
                  d={`M${x},${y} L${x2},${y2}`}
                  strokeWidth={2}
                  stroke={
                    Palette[allLines.findIndex((a) => a.name === line.name)]
                  }
                />
              );
            }
            return (
              <Fragment key={line.name + i}>
                <circle
                  cx={x}
                  cy={y}
                  fill={
                    Palette[allLines.findIndex((a) => a.name === line.name)]
                  }
                  r={3}
                />
                {graphLine}
              </Fragment>
            );
          })
        )}
        {lines.map((l, li) => {
          if (l.points[l.points.length - 1].date === dateRange[1]) {
            return <Fragment key={l.name + li} />;
          }
          const x = computeX(dims, margins[0], dateRange, dateRange[1]);
          const y = computeY(
            dims,
            margins[1],
            balanceRange,
            l.points[l.points.length - 1].balance
          );

          const x2 = computeX(
            dims,
            margins[0],
            dateRange,
            l.points[l.points.length - 1].date
          );
          const y2 = computeY(
            dims,
            margins[1],
            balanceRange,
            l.points[l.points.length - 1].balance
          );
          return (
            <path
              key={l.name + li}
              d={`M${x},${y} L${x2},${y2}`}
              strokeWidth={2}
              stroke={Palette[allLines.findIndex((a) => a.name === l.name)]}
            />
          );
        })}
      </svg>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {allLines.map((l, i) => (
          <Button
            key={i}
            sx={{
              m: 1,
              color: Palette[allLines.findIndex((a) => a.name === l.name)],
            }}
            style={{
              userSelect: "none",
              textDecoration: visibleAccounts.includes(l.name)
                ? ""
                : "line-through",
            }}
            onClick={() => {
              if (visibleAccounts.includes(l.name))
                setVisibleAccounts(visibleAccounts.filter((v) => v !== l.name));
              else setVisibleAccounts([...visibleAccounts, l.name]);
            }}
          >
            {l.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
