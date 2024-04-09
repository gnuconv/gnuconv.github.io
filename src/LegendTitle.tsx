import { useDispatch } from "react-redux";
import {
  setHighlightedCategory,
  useHighlightedCategory,
} from "./redux/slices/highlightedCategory";
import { pushCategory } from "./redux/slices/selectedCategory";
import { Typography } from "@mui/material";

interface LegendTitleProps {
  name: string;
  amount: number;
}

export const LegendTitle = ({ name, amount }: LegendTitleProps) => {
  const dispatch = useDispatch();
  const highlightedCategory = useHighlightedCategory();

  const onMouseEnter = () => dispatch(setHighlightedCategory(name));
  const onClick = () => dispatch(pushCategory(name));
  return (
    <Typography
      sx={{
        mx: 1,
        backgroundColor: highlightedCategory === name ? "#666" : "",
        p: 2,
        cursor: "pointer",
        borderRadius: 1,
      }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {name}
      <br />${amount.toFixed(2)}
    </Typography>
  );
};
