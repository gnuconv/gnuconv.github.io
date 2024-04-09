import { margin } from "./ExpensesChart";
import { SVGBox } from "./SVGBox";
import { createPalette } from "./colors";
import { GraphNode, calculateSize } from "./gnuProcessor";

interface SVGRowProps {
  palette: string[];
  canvasWidth: number;
  width: number;
  height: number;
  x: number;
  y: number;
  nodes: GraphNode[];
  categories: string[];
}

export const SVGRow = ({
  categories,
  palette,
  canvasWidth,
  width,
  height,
  nodes,
  x,
  y,
}: SVGRowProps) => {
  const totalSize = calculateSize(nodes);
  const ratio = width / totalSize;
  const subWidth = 1 - (nodes.length - 1) * margin;

  const data = nodes.map((n, i) => ({
    name: n.name,
    color: palette[i % palette.length],
    x: 0,
    y: y,
    width: calculateSize(n) * ratio * subWidth,
    height: height,
    children: n.children,
  }));

  const calculateWidth = (nodes: any) =>
    nodes.reduce((acc: number, c: any) => acc + c.width, 0);

  data.forEach(
    (n, i) => (n.x = x + calculateWidth(data.slice(0, i)) + width * margin * i)
  );
  const elements = [];
  for (const [i, n] of Object.entries(data)) {
    elements.push(
      <SVGBox
        key={`B${i}`}
        {...n}
        canvasWidth={canvasWidth}
        canHighlight={!!n.children?.length}
        categories={categories.concat(n.name)}
      />
    );
    if (n.children)
      elements.push(
        <SVGRow
          categories={categories.concat(n.name)}
          palette={createPalette(n.color, n.children.length)}
          key={`R${i}`}
          canvasWidth={canvasWidth}
          width={n.width}
          height={height}
          x={n.x}
          y={y + height + canvasWidth * margin}
          nodes={n.children}
        />
      );
  }
  return <>{elements}</>;
};
