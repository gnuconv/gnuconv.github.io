import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  selectEndDate,
  selectStartDate,
  setEndDate,
  setStartDate,
} from "../redux/slices/timeframe";
import dayjs from "dayjs";
import { clearCategories } from "../redux/slices/selectedCategory";
import { onHighlightedCategoryChange } from "../redux/slices/highlightedCategory";
import { useAppSelector } from "../redux/hooks";

const msToNs = 1000;
export const Timeframe = (): React.ReactElement => {
  const dispatch = useDispatch();
  const start = useAppSelector(selectStartDate);
  const end = useAppSelector(selectEndDate);

  const onStartDateChange = (d: dayjs.Dayjs | null): void => {
    if (!d) return;
    dispatch(clearCategories());
    dispatch(onHighlightedCategoryChange(""));
    dispatch(setStartDate(d.unix()));
  };

  const onEndDateChange = (d: dayjs.Dayjs | null): void => {
    if (!d) return;
    dispatch(clearCategories());
    dispatch(onHighlightedCategoryChange(""));
    dispatch(setEndDate(d.unix()));
  };

  const addMonth = (n: number) => (): void => {
    dispatch(clearCategories());
    dispatch(onHighlightedCategoryChange(""));
    dispatch(
      setStartDate(
        dayjs(start * msToNs)
          .add(n, "month")
          .unix()
      )
    );
    dispatch(
      setEndDate(
        dayjs(end * msToNs)
          .add(n, "month")
          .unix()
      )
    );
  };

  return (
    <>
      <DatePicker
        sx={{ my: 2 }}
        label="start date"
        value={dayjs(start * msToNs)}
        onChange={onStartDateChange}
      />
      <DatePicker
        sx={{ my: 2 }}
        label="end date"
        value={dayjs(end * msToNs)}
        onChange={onEndDateChange}
      />
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <IconButton onClick={addMonth(-1)}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={addMonth(1)}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </>
  );
};
