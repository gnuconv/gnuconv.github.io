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
const margin = 0.05;

export const SVGBox = (n: SVGBoxProps): React.ReactElement => {
  const border = 0.002;
  const dispatch = useDispatch();
  const isHighlighted = useAppSelector(
    useCallback(
      (state: RootState): boolean => state.highlightedCategory.value === n.name,
      [n.name]
    )
  );
  const onMouseEnter = (): void => {
    if (!n.canHighlight) return;
    dispatch(onHighlightedCategoryChange(n.name));
  };
  const onClick = (): void => {
    if (!n.canHighlight || !n.categories) return;
    dispatch(pushAllCategories(n.categories));
  };
  return (
    <>
      <rect
        x={n.x}
        y={n.y}
        width={n.width}
        height={n.height}
        fill={n.color}
        stroke={isHighlighted && n.canHighlight ? "white" : ""}
        strokeWidth={
          isHighlighted && n.canHighlight ? n.canvasWidth * border : ""
        }
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        style={{ cursor: n.canHighlight ? "pointer" : "default" }}
      ></rect>
      <text
        x={n.x + n.width * margin}
        y={n.y + n.height / half}
        fontSize={n.height / half}
        style={{ cursor: n.canHighlight ? "pointer" : "default" }}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      >
        {n.name}
      </text>
    </>
  );
};
