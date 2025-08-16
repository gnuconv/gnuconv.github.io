import React from "react";
import { IconButton, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  onRuleFileUpload,
  selectError,
  selectNumRules,
} from "../redux/slices/rules";

export const EditRules = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const numRules = useAppSelector(selectNumRules);
  const error = useAppSelector(selectError);

  const handleRulesFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!event.target.files) return;
    const [file] = event.target.files;
    (async (): Promise<void> => {
      const content = await file.text();
      dispatch(onRuleFileUpload(content));
    })();
  };
  return (
    <>
      <Typography variant="h4" sx={{ display: "flex", alignItems: "center" }}>
        Conversion rules
        <IconButton component="label">
          <FileUploadIcon />
          <input onChange={handleRulesFileUpload} hidden multiple type="file" />
        </IconButton>
      </Typography>

      {numRules > 0 && (
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <CheckCircleOutlineIcon sx={{ color: "green" }} /> {numRules} rules
        </Typography>
      )}
      {error && (
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <ErrorOutlineIcon sx={{ color: "red" }} /> {error}
        </Typography>
      )}
      {numRules === 0 && !error && (
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          No rules loaded
        </Typography>
      )}
    </>
  );
};
