import { useDispatch } from "react-redux";
import { onHighlightedCategoryChange } from "../redux/slices/highlightedCategory";
import { pushCategory } from "../redux/slices/selectedCategory";
import { Typography } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useCallback } from "react";
import type { RootState } from "../redux/store";

interface LegendTitleProps {
  name: string;
  amount: number;
}

export const LegendTitle = ({
  name,
  amount,
}: LegendTitleProps): React.ReactElement => {
  const dispatch = useDispatch();
  const isHighlighted = useAppSelector(
    useCallback(
      (state: RootState) => state.highlightedCategory.value === name,
      [name]
    )
  );

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
        backgroundColor: isHighlighted ? "#666" : "",
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
