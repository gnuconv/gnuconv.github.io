import { useDispatch } from "react-redux";
import { onHighlightedCategoryChange } from "../redux/slices/highlightedCategory";
import { pushAllCategories } from "../redux/slices/selectedCategory";
import { useAppSelector } from "../redux/hooks";
import { useCallback } from "react";
import type { RootState } from "../redux/store";

type SVGBoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  name: string;
  canvasWidth: number;
  canHighlight: boolean;
  categories?: string[];
};

const half = 2;
const margin = 0.025;
const border = 0.002;

export const SVGBox = (n: SVGBoxProps): React.ReactElement => {
  const dispatch = useDispatch();
  const isHovered = useAppSelector(
    useCallback(
      (state: RootState): boolean => state.highlightedCategory.value === n.name,
      [n.name]
    )
  );
  const isHighlighted = isHovered && n.canHighlight;
  const onMouseEnter = (): void => {
    if (!n.canHighlight) return;
    dispatch(onHighlightedCategoryChange(n.name));
  };
  const onClick = (): void => {
    if (!n.canHighlight || !n.categories) return;
    dispatch(pushAllCategories(n.categories));
  };

  return (
    <g
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      transform={`translate(${n.x} ${n.y})`}
      style={{ cursor: n.canHighlight ? "pointer" : "default" }}
      fontSize={n.height / half}
    >
      <rect
        width={n.width}
        height={n.height}
        fill={n.color}
        stroke={isHighlighted ? "white" : ""}
        strokeWidth={isHighlighted ? n.canvasWidth * border : ""}
      />
      <text x={n.width * margin} y={n.height / half}>
        {n.name}
      </text>
    </g>
  );
};
