import { useGNUFile } from "./redux/slices/gnuFile";
import { useTimeframe } from "./redux/slices/timeframe";
import { Palette } from "./colors";
import { Box, Typography } from "@mui/material";
import { useSelectedCategory } from "./redux/slices/selectedCategory";
import { LegendTitle } from "./LegendTitle";
import { SVGRow } from "./SVGRow";
import { PopCategory } from "./PopCategory";
import { GraphNode, processChart } from "./gnuProcessor";

export const margin = 0.003;

const maxDepth = (n: GraphNode): number => {
  if (!n.children) return 1;
  return 1 + Math.max(...n.children.map(maxDepth));
};

const findNode = (root: GraphNode, path: string[]): GraphNode => {
  if (path.length === 0) return root;
  const child = root.children?.find((c) => c.name === path[0]);
  if (!child) return root;
  return findNode(child, path.slice(1));
};

export const ExpensesChart = () => {
  const { start, end } = useTimeframe();
  const selectedCategory = useSelectedCategory();
  const gnuFile = useGNUFile();
  if (!start || !end || !gnuFile.content) return null;
  const tree = processChart(gnuFile.content, start, end);

  const root = findNode(tree, selectedCategory);

  const nodes = root.children?.sort((a, b) => b.size - a.size) ?? [];

  const expenses = root.size;
  const canvasWidth = 10000;
  const lineHeight = canvasWidth / 30;

  const depth = maxDepth(root) - 1;

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
          {root.name} total: ${expenses.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <PopCategory />
        {nodes.map((n, i) => (
          <LegendTitle key={i} name={n.name} amount={n.size} />
        ))}
      </Box>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="200"
        viewBox={`0 0 ${canvasWidth} ${depth * lineHeight * (1 + margin)}`}
      >
        <SVGRow
          categories={[]}
          palette={Palette}
          canvasWidth={canvasWidth}
          width={canvasWidth}
          height={lineHeight}
          x={0}
          y={0}
          nodes={nodes}
        />
      </svg>
    </Box>
  );
};
