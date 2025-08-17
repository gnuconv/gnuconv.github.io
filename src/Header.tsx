import { Tab, Tabs } from "@mui/material";
import { onPageChange, Page, selectPage } from "./redux/slices/page";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export const Header = (): React.ReactElement => {
  const page = useAppSelector(selectPage);
  const dispatch = useAppDispatch();

  const onChange = (_: unknown, v: Page): void => {
    dispatch(onPageChange(v));
  };

  return (
    <Tabs value={page} onChange={onChange} variant="fullWidth">
      {Object.values(Page).map((p) => (
        <Tab key={p} label={p} value={p} />
      ))}
    </Tabs>
  );
};
