import { useDispatch } from "react-redux";
import { onHighlightedCategoryChange } from "../redux/slices/highlightedCategory";
import { pushCategory } from "../redux/slices/selectedCategory";
import { Typography } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useCallback } from "react";
import type { RootState } from "../redux/store";

type LegendTitleProps = {
  name: string;
  amount: number;
  canClick: boolean;
};

export const LegendTitle = ({
  name,
  amount,
  canClick,
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
      onClick={canClick ? onClick : undefined}
    >
      {name}
      <br />${amount.toFixed(2)}
    </Typography>
  );
};
