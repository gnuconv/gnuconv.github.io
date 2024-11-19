import { Button } from "@mui/material";
import type { Account } from "./processor";

interface LineToggleProps {
  account: Account;
  disabled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const LineToggle = ({
  account,
  disabled,
  onClick,
  onMouseEnter: onEnter,
  onMouseLeave: onLeave,
}: LineToggleProps): React.ReactElement => {
  return (
    <Button
      sx={{
        m: 1,
        color: account.color,
        borderWidth: 1,
        borderColor: account.color,
        borderStyle: "solid",
      }}
      style={{
        userSelect: "none",
        textDecoration: !disabled ? "" : "line-through",
      }}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {account.name}
    </Button>
  );
};
