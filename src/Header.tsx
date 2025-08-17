import { Tab, Tabs } from "@mui/material";
import { onPageChange, Page, selectPage } from "./redux/slices/page";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export const Header = (): React.ReactElement => {
  const page = useAppSelector(selectPage);
  const dispatch = useAppDispatch();

  const onChange = (_e: unknown, v: unknown): void => {
    dispatch(onPageChange(v as Page));
  };

  return (
    <Tabs value={page} onChange={onChange} variant="fullWidth">
      <Tab label={Page.CONVERT} value={Page.CONVERT} />
      <Tab label={Page.ANALYZE} value={Page.ANALYZE} />
    </Tabs>
  );
};
