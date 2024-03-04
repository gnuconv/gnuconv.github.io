import React from "react";
import { Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRules } from "./redux/slices/rules";

export const RulesValidation = (): React.ReactElement => {
  const rules = useRules();

  if (!rules) {
    return (
      <Typography sx={{ display: "flex", alignItems: "center" }}>
        <ErrorOutlineIcon sx={{ color: "red" }} />
        &nbsp;Invalid rules
      </Typography>
    );
  }

  return (
    <Typography sx={{ display: "flex", alignItems: "center" }}>
      <CheckCircleOutlineIcon sx={{ color: "green" }} />
      &nbsp;{rules.length} rules
    </Typography>
  );
};
