import { Button } from "@mui/material";
import { Account } from "./processor";

interface LineToggleProps {
  account: Account;
  disabled: boolean;
  onClick: () => void;
}

export const LineToggle = ({ account, disabled, onClick }: LineToggleProps) => {
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
    >
      {account.name}
    </Button>
  );
};
