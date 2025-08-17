import { useCallback } from "react";
import type { Page } from "./redux/slices/page";
import type { RootState } from "./redux/store";
import { useAppSelector } from "./redux/hooks";

type PageWrapperProps = React.PropsWithChildren<{
  page: Page;
}>;

const emptyFragment = <></>;

export const PageWrapper = ({
  children,
  page,
}: PageWrapperProps): React.ReactNode => {
  const isSelected = useAppSelector(
    useCallback((state: RootState) => state.page.value === page, [page])
  );

  return !isSelected ? emptyFragment : children;
};
