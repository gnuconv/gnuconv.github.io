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
  isParent: boolean;
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
  isParent,
  categories,
}: IcicleBoxProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const isHovered = useAppSelector(
    useCallback(
      (state: RootState): boolean => state.highlightedCategory.value === text,
      [text]
    )
  );

  const onMouseEnter = (): void => {
    if (!isParent) return;
    dispatch(onHighlightedCategoryChange(text));
  };
  const onClick = (): void => {
    if (!isParent || !categories) return;
    dispatch(pushAllCategories(categories));
  };

  return (
    <g
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      transform={`translate(${dx} ${dy})`}
      style={{ cursor: isParent ? "pointer" : "default" }}
    >
      <rect
        width={width}
        height={height}
        fill={color}
        stroke={isHovered ? "white" : ""}
        strokeWidth={isHovered ? border : ""}
      />
      <text x={30} y={height * 0.6} fontSize={(height * 2) / 3}>
        {text}
      </text>
    </g>
  );
};
