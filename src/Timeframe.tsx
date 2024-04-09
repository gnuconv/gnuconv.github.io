import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setTimeframe, useTimeframe } from "./redux/slices/timeframe";
import dayjs from "dayjs";
import { clearCategories } from "./redux/slices/selectedCategory";
import { setHighlightedCategory } from "./redux/slices/highlightedCategory";

export const Timeframe = () => {
  const dispatch = useDispatch();
  const { start, end } = useTimeframe();

  const setStartDate = (d: dayjs.Dayjs | null) => {
    if (!d) return;
    dispatch(clearCategories());
    dispatch(setHighlightedCategory(""));
    dispatch(setTimeframe({ start: d.unix(), end: end }));
  };

  const setEndDate = (d: dayjs.Dayjs | null) => {
    if (!d) return;
    dispatch(clearCategories());
    dispatch(setHighlightedCategory(""));
    dispatch(setTimeframe({ start: start, end: d.unix() }));
  };

  const addMonth = (n: number) => () => {
    dispatch(clearCategories());
    dispatch(setHighlightedCategory(""));
    dispatch(
      setTimeframe({
        start: dayjs(start * 1000)
          .add(n, "month")
          .unix(),
        end: dayjs(end * 1000)
          .add(n, "month")
          .unix(),
      })
    );
  };

  return (
    <>
      <DatePicker
        sx={{ my: 2 }}
        label="start date"
        value={dayjs(start * 1000)}
        onChange={setStartDate}
      />
      <DatePicker
        sx={{ my: 2 }}
        label="end date"
        value={dayjs(end * 1000)}
        onChange={setEndDate}
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
