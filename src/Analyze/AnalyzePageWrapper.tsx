import { useCallback } from "react";
import { useAppSelector } from "../redux/hooks";
import type { AnalyzePage } from "../redux/slices/analyzePage";
import type { RootState } from "../redux/store";

type PageWrapperProps = React.PropsWithChildren<{
  page: AnalyzePage;
}>;

const emptyFragment = <></>;

export const AnalyzePageWrapper = ({
  children,
  page,
}: PageWrapperProps): React.ReactNode => {
  const isSelected = useAppSelector(
    useCallback((state: RootState) => state.analyzePage.value === page, [page])
  );
  return !isSelected ? emptyFragment : children;
};
