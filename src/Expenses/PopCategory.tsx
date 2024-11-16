import { useDispatch } from "react-redux";
import { popCategory } from "../redux/slices/selectedCategory";
import { IconButton } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

export const PopCategory = (): React.ReactElement => {
  const dispatch = useDispatch();
  const onClick = (): void => {
    dispatch(popCategory());
  };
  return (
    <IconButton onClick={onClick}>
      <HistoryIcon />
    </IconButton>
  );
};
