import { Tab, Tabs } from "@mui/material";
import {
  AnalyzePage,
  onAnalyzePageChange,
  selectAnalyzePage,
} from "../redux/slices/analyzePage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const AnalyzeHeader = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const analyzePage = useAppSelector(selectAnalyzePage);

  const onChange = (_e: unknown, v: AnalyzePage): void => {
    dispatch(onAnalyzePageChange(v));
  };

  return (
    <Tabs value={analyzePage} onChange={onChange} variant="fullWidth">
      <Tab label={AnalyzePage.EXPENSES} value={AnalyzePage.EXPENSES} />
      <Tab label={AnalyzePage.ASSETS} value={AnalyzePage.ASSETS} />
    </Tabs>
  );
};
