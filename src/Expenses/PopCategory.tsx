import { useDispatch } from "react-redux";
import {
  popCategory,
  selectHasCategory,
} from "../redux/slices/selectedCategory";
import { Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useAppSelector } from "../redux/hooks";

export const PopCategory = (): React.ReactElement => {
  const dispatch = useDispatch();
  const hasCategory = useAppSelector(selectHasCategory);
  const onClick = (): void => {
    dispatch(popCategory());
  };
  return (
    <Box>
      <IconButton disabled={!hasCategory} onClick={onClick}>
        <ArrowUpwardIcon />
      </IconButton>
    </Box>
  );
};
