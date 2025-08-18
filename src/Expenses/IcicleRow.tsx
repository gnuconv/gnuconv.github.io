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
  if (!r.children) return <></>;
  const elements: React.ReactElement[] = [];
  let dx = startX;
  const occupiedWidth =
    width -
    spacing * (r.children.filter((n) => n.add + n.remove > 0).length - 1);

  const rowAdjustedSize = r.children.reduce(
    (acc, c) => acc + (c.children ? c.add + c.remove : c.add),
    0
  );

  for (let i = 0; i < r.children.length; i++) {
    const n = r.children[i];
    if ((n.remove < 0 && n.add === 0) || n.add + n.remove === 0) continue;

    const boxWidth = ((n.add + n.remove) / rowAdjustedSize) * occupiedWidth;
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
        isParent={(n.children?.length ?? 0) > 0}
        categories={categories.concat(n.name)}
      />
    );
    if ((n.children?.length ?? 0) > 0) {
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
