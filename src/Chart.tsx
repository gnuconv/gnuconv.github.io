import Sunburst from "sunburst-chart";
import { InputFile } from "./InputFile";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  ExtractAccounts,
  ExtractTransactions,
  GNUAccount,
  GNUTransaction,
} from "./chartUtils";
import { setUploadChart, useUploadChart } from "./redux/slices/uploadChart";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";

interface AccountTreeTransaction {
  name: string;
  value: number;
}

interface AccountTreeNode {
  account: GNUAccount;
  transactions?: AccountTreeTransaction[];
  children?: AccountTreeNode[];
}

const makeTreeNode = (
  accounts: GNUAccount[],
  transactions: GNUTransaction[],
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
  account: GNUAccount
): AccountTreeNode => {
  const children = accounts
    .filter((a) => a.parent === account.id)
    .map((a) => makeTreeNode(accounts, transactions, start, end, a));
  if (children.length > 0) {
    return {
      account,
      children: children,
    };
  }

  transactions.reduce((acc, t) => {
    const split = t.splits.find((s) => s.account === account.id);
    if (
      split &&
      t.date >= start.unix() &&
      t.date <= end.unix() &&
      split.value > 0
    ) {
      return acc + split.value;
    }
    return acc;
  }, 0);

  return {
    account,
    transactions: transactions
      .filter((t) => t.date >= start.unix() && t.date <= end.unix())
      .filter((t) => t.splits.some((s) => s.account === account.id))
      .map((t) => ({
        name: t.description,
        value: t.splits.find((s) => s.account === account.id)!.value,
      })),
  };
};
const stringToColour = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
};
const convertAccountTree = (node: AccountTreeNode): any => {
  if (node.transactions) {
    return {
      name: `${node.account.name} (${node.transactions
        .reduce((acc, t) => acc + t.value, 0)
        .toFixed(0)})`,
      color: stringToColour(node.account.name),
      children: node.transactions.map((t) => ({
        name: t.name,
        size: t.value,
        color: stringToColour(t.name),
      })),
    };
  }
  if (node.children) {
    return {
      name: node.account.name,
      color: stringToColour(node.account.name),
      children: node.children.map(convertAccountTree),
    };
  }
};

const processChart = (data: string, start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "text/xml");
  const accounts = ExtractAccounts(xmlDoc);
  const transactions = ExtractTransactions(xmlDoc);

  const expenses = accounts.find((a) => a.name === "Expenses")!;
  const accountTree = makeTreeNode(
    accounts,
    transactions,
    start,
    end,
    expenses
  );

  const out = convertAccountTree(accountTree);
  out.children = out.children.filter((c: any) => !c.name.includes("UNKNOWN"));
  return out;
};

export const Chart = () => {
  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").add(-1, "month")
  );
  const [endDate, setEndDate] = useState(dayjs());
  const chartDiv = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const gnudata = useUploadChart();
  useEffect(() => {
    if (!gnudata) return;
    if (!chartDiv.current || !boxRef.current) return;
    const data = processChart(gnudata, startDate, endDate);
    chartDiv.current.innerHTML = "";
    const sb = Sunburst();
    sb.data(data);
    sb.size("size");
    sb.width(800);
    sb.height(800);
    sb.color("color");
    sb.excludeRoot(true);
    sb.radiusScaleExponent(1);
    sb(chartDiv.current);
  }, [gnudata, chartDiv, boxRef, startDate, endDate]);
  return (
    <>
      {!gnudata && (
        <InputFile
          onUpload={async (f: File) => {
            let ds = new (window as any).DecompressionStream("gzip");
            let decompressedStream = f.stream().pipeThrough(ds);
            const resp = await new Response(decompressedStream).blob();
            const text = await resp.text();
            dispatch(setUploadChart(text));
          }}
        />
      )}
      {gnudata && (
        <Box ref={boxRef} sx={{ height: "100%", width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-around", m: 4 }}>
            <DatePicker
              label="start date"
              value={startDate}
              onChange={(e) => e && setStartDate(e)}
            />
            <DatePicker
              label="end date"
              value={endDate}
              onChange={(e) => e && setEndDate(e)}
            />
          </Box>
          <div ref={chartDiv} />
        </Box>
      )}
    </>
  );
};
