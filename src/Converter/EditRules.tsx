import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { RulesModal } from "./RulesModal";
import { RulesValidation } from "./RulesValidation";

export const EditRules = (): React.ReactElement => {
  const [editOpen, setEditOpenState] = useState(false);

  const setEditOpen = (open: boolean) => () => setEditOpenState(open);

  return (
    <>
      <Typography variant="h4" sx={{ display: "flex", alignItems: "center" }}>
        Conversion rules&nbsp;
        <IconButton onClick={setEditOpen(true)}>
          <SettingsIcon sx={{ color: "green" }} fontSize="large" />
        </IconButton>
      </Typography>
      <RulesValidation />
      <RulesModal open={editOpen} onClose={setEditOpen(false)} />
    </>
  );
};
