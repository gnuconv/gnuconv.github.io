import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setTimeframe, useTimeframe } from "../redux/slices/timeframe";
import dayjs from "dayjs";
import { clearCategories } from "../redux/slices/selectedCategory";
import { setHighlightedCategory } from "../redux/slices/highlightedCategory";

const msToNs = 1000;
export const Timeframe = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { start, end } = useTimeframe();

  const setStartDate = (d: dayjs.Dayjs | null): void => {
    if (!d) return;
    dispatch(clearCategories());
    dispatch(setHighlightedCategory(""));
    dispatch(setTimeframe({ start: d.unix(), end: end }));
  };

  const setEndDate = (d: dayjs.Dayjs | null): void => {
    if (!d) return;
    dispatch(clearCategories());
    dispatch(setHighlightedCategory(""));
    dispatch(setTimeframe({ start: start, end: d.unix() }));
  };

  const addMonth = (n: number) => (): void => {
    dispatch(clearCategories());
    dispatch(setHighlightedCategory(""));
    dispatch(
      setTimeframe({
        start: dayjs(start * msToNs)
          .add(n, "month")
          .unix(),
        end: dayjs(end * msToNs)
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
        value={dayjs(start * msToNs)}
        onChange={setStartDate}
      />
      <DatePicker
        sx={{ my: 2 }}
        label="end date"
        value={dayjs(end * msToNs)}
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
