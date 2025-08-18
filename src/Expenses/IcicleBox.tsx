import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { RootState } from "../redux/store";
import { onHighlightedCategoryChange } from "../redux/slices/highlightedCategory";
import { pushAllCategories } from "../redux/slices/selectedCategory";

type IcicleBoxProps = {
  dx: number;
  dy: number;
  height: number;
  width: number;
  text: string;
  color: string;
  canHighlight: boolean;
  categories: string[];
};

const border = 10;

export const IcicleBox = ({
  dx,
  dy,
  width,
  height,
  text,
  color,
  canHighlight,
  categories,
}: IcicleBoxProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const isHovered = useAppSelector(
    useCallback(
      (state: RootState): boolean => state.highlightedCategory.value === text,
      [text]
    )
  );
  const isHighlighted = isHovered && canHighlight;

  const onMouseEnter = (): void => {
    if (!canHighlight) return;
    dispatch(onHighlightedCategoryChange(text));
  };
  const onClick = (): void => {
    if (!canHighlight || !categories) return;
    dispatch(pushAllCategories(categories));
  };

  return (
    <g
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      transform={`translate(${dx} ${dy})`}
      style={{ cursor: canHighlight ? "pointer" : "default" }}
    >
      <rect
        width={width}
        height={height}
        fill={color}
        stroke={isHighlighted ? "white" : ""}
        strokeWidth={isHighlighted ? border : ""}
      />
      <text x={30} y={height * 0.6} fontSize={(height * 2) / 3}>
        {text}
      </text>
    </g>
  );
};
