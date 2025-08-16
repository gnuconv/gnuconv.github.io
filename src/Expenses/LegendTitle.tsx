import { useDispatch } from "react-redux";
import {
  selectHighlightedCategory,
  onHighlightedCategoryChange,
} from "../redux/slices/highlightedCategory";
import { pushCategory } from "../redux/slices/selectedCategory";
import { Typography } from "@mui/material";
import { useAppSelector } from "../redux/hooks";

interface LegendTitleProps {
  name: string;
  amount: number;
}

export const LegendTitle = ({
  name,
  amount,
}: LegendTitleProps): React.ReactElement => {
  const dispatch = useDispatch();
  const highlightedCategory = useAppSelector(selectHighlightedCategory);

  const onMouseEnter = (): void => {
    dispatch(onHighlightedCategoryChange(name));
  };
  const onClick = (): void => {
    dispatch(pushCategory(name));
  };
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
