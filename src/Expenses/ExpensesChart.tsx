import { selectAccounts, selectTransactions } from "../redux/slices/gnu";
import { Box, Typography } from "@mui/material";
import { selectCategory } from "../redux/slices/selectedCategory";
import { LegendTitle } from "./LegendTitle";
import { PopCategory } from "./PopCategory";
import type { GraphNode } from "./treeProcessor";
import { processTree } from "./treeProcessor";
import { useAppSelector } from "../redux/hooks";
import { selectEndDate, selectStartDate } from "../redux/slices/timeframe";
import { useMemo } from "react";
import { IciclePlot } from "./IciclePlot";

export const margin = 0.003;

const findNode = (root: GraphNode, path: string[]): GraphNode => {
  if (path.length === 0) return root;
  const child = root.children?.find((c) => c.name === path[0]);
  if (!child) return root;
  return findNode(child, path.slice(1));
};

const sortNodes = (n: GraphNode): void => {
  n.children?.sort((a, b) => b.size - a.size);
  n.children?.forEach((c) => {
    sortNodes(c);
  });
};

export const ExpensesChart = (): React.ReactElement => {
  const accounts = useAppSelector(selectAccounts);
  const transactions = useAppSelector(selectTransactions);
  const start = useAppSelector(selectStartDate);
  const end = useAppSelector(selectEndDate);
  const selectedCategory = useAppSelector(selectCategory);
  if (!start || !end) return <></>;

  const tree = useMemo(
    () => processTree(accounts, transactions, start, end),
    [accounts, end, start, transactions]
  );

  const root = useMemo(() => {
    const n = findNode(tree, selectedCategory);
    sortNodes(n);
    return n;
  }, [selectedCategory, tree]);

  const nodes = root.children ?? [];

  const expenses = root.size;

  return (
    <Box sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h3">
          {["Expenses", ...selectedCategory].join(" > ")}: $
          {expenses.toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <PopCategory />
        {nodes.map((n, i) => (
          <LegendTitle key={i} name={n.name} amount={n.size} />
        ))}
      </Box>
      <IciclePlot root={root} />
    </Box>
  );
};
