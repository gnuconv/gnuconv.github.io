import { darken } from "./colors";
import { IcicleBox } from "./IcicleBox";
import type { GraphNode } from "./treeProcessor";

type RowProps = {
  r: GraphNode;
  startX: number;
  startY: number;
  width: number;
  height: number;
  spacing: number;
  palette: string[];
  categories: string[];
};

export const IcicleRow = ({
  r,
  startX,
  startY,
  width,
  height,
  spacing,
  palette,
  categories,
}: RowProps): React.ReactElement => {
  const elements: React.ReactElement[] = [];
  let dx = startX;
  const occupiedWidth = width - spacing * (r.children.length - 1);
  for (let i = 0; i < r.children.length; i++) {
    const n = r.children[i];
    if (n.size < 0) continue;
    const boxWidth = (n.size / r.size) * occupiedWidth;
    const color = palette[i % palette.length];
    elements.push(
      <IcicleBox
        key={`B${i}`}
        dx={dx}
        dy={startY}
        height={height}
        width={boxWidth}
        text={n.name}
        color={color}
        canHighlight={n.children.length > 0}
        categories={categories.concat(n.name)}
      />
    );
    if (n.children.length > 0) {
      elements.push(
        <IcicleRow
          key={`R${i}`}
          r={n}
          startX={dx}
          startY={startY + height + spacing}
          width={boxWidth}
          height={height}
          palette={[darken(color)]}
          spacing={spacing}
          categories={categories.concat(n.name)}
        />
      );
    }
    dx += boxWidth + spacing;
  }

  return <>{elements}</>;
};
