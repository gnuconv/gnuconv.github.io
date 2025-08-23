import { selectAccounts, selectTransactions } from "../redux/slices/gnu";
import { Box } from "@mui/material";
import { selectCategory } from "../redux/slices/selectedCategory";
import { LegendTitle } from "./LegendTitle";
import type { GraphNode } from "./treeProcessor";
import { processTree } from "./treeProcessor";
import { useAppSelector } from "../redux/hooks";
import { selectEndDate, selectStartDate } from "../redux/slices/timeframe";
import { useMemo } from "react";
import { IciclePlot } from "./IciclePlot";
import { Breadcrumbs } from "./Breadcrumbs";
import { darken, Palette } from "./colors";

export const margin = 0.003;

const findNode = (
  root: GraphNode,
  path: string[],
  palette: string[]
): [GraphNode, string[]] => {
  if (path.length === 0 || !root.children) return [root, palette];
  const child = root.children?.findIndex((c) => c.name === path[0]) ?? -1;
  if (child === -1) return [root, palette];
  return findNode(root.children?.[child], path.slice(1), [
    darken(palette[child % palette.length]),
  ]);
};

const sortNodes = (n: GraphNode): void => {
  n.children?.sort((a, b) => b.add + b.remove - (a.add + a.remove));
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

  const [root, palette] = useMemo(() => {
    const [n, palette] = findNode(tree, selectedCategory, Palette);
    sortNodes(n);
    return [n, palette];
  }, [selectedCategory, tree]);

  const nodes = root.children ?? [];

  const expenses = root.add + root.remove;

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
        <Breadcrumbs categories={selectedCategory} amount={expenses} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        {nodes
          .filter((n) => n.add + n.remove !== 0)
          .map((n, i) => (
            <LegendTitle
              key={i}
              name={n.name}
              amount={n.add + n.remove}
              canClick={!!n.children}
            />
          ))}
      </Box>
      <IciclePlot root={root} palette={palette} />
    </Box>
  );
};
