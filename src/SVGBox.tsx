import { useDispatch } from "react-redux";
import {
  setHighlightedCategory,
  useHighlightedCategory,
} from "./redux/slices/highlightedCategory";
import { pushAllCategories } from "./redux/slices/selectedCategory";

interface SVGBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  name: string;
  canvasWidth: number;
  canHighlight: boolean;
  categories?: string[];
}

export const SVGBox = (n: SVGBoxProps) => {
  const border = 0.002;
  const dispatch = useDispatch();
  const highlightedCategory = useHighlightedCategory();
  const onMouseEnter = () => {
    if (!n.canHighlight) return;
    dispatch(setHighlightedCategory(n.name));
  };
  const onClick = () => {
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
        x={n.x + n.width * 0.05}
        y={n.y + n.height / 2}
        fontSize={n.height / 2}
        style={{ cursor: n.canHighlight ? "pointer" : "default" }}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      >
        {n.name}
      </text>
    </>
  );
};
