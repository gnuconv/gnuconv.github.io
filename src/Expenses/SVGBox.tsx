import { useDispatch } from "react-redux";
import {
  selectHighlightedCategory,
  onHighlightedCategoryChange,
} from "../redux/slices/highlightedCategory";
import { pushAllCategories } from "../redux/slices/selectedCategory";
import { useAppSelector } from "../redux/hooks";

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
  const highlightedCategory = useAppSelector(selectHighlightedCategory);
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
        stroke={highlightedCategory === n.name ? "white" : ""}
        strokeWidth={
          highlightedCategory === n.name ? n.canvasWidth * border : ""
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
