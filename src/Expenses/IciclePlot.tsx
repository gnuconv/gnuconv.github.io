import { maxDepth } from "./chartUtils";
import { Palette } from "./colors";
import { IcicleRow } from "./IcicleRow";
import type { GraphNode } from "./treeProcessor";

type IciclePlotProps = {
  root: GraphNode;
};

const margin = 0.003;
export const IciclePlot = ({ root }: IciclePlotProps): React.ReactElement => {
  const fullWidth = 7000;
  const depth = maxDepth(root);
  const lineHeight = 200;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`0 0 ${fullWidth} ${depth * lineHeight * (1 + margin)}`}
    >
      <IcicleRow
        r={root}
        startX={0}
        startY={5}
        width={fullWidth}
        height={lineHeight}
        palette={Palette}
        spacing={fullWidth * 0.0025}
        categories={[]}
      />
    </svg>
  );
};
