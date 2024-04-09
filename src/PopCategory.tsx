import { useDispatch } from "react-redux";
import { popCategory } from "./redux/slices/selectedCategory";
import { IconButton } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

export const PopCategory = () => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(popCategory());
  return (
    <IconButton onClick={onClick}>
      <HistoryIcon />
    </IconButton>
  );
};
