import { Box } from "@mui/material";
import { GNUFileSelector } from "../Expenses/GNUFileSelector";
import { useAppSelector } from "../redux/hooks";
import { selectHasGNUFile } from "../redux/slices/gnu";

type SelectFileGuardProps = React.PropsWithChildren<object>;

export const SelectFileGuard = ({
  children,
}: SelectFileGuardProps): React.ReactNode => {
  const hasGNUFile = useAppSelector(selectHasGNUFile);

  if (hasGNUFile) return children;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <GNUFileSelector />
    </Box>
  );
};
