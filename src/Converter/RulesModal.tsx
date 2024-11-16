import React, { useState } from "react";
import { Modal } from "../components/Modal";
import { Box, TextField } from "@mui/material";
import { RulesValidation } from "./RulesValidation";
import { useDispatch } from "react-redux";
import type { Rule } from "../redux/slices/rules";
import { setRules } from "../redux/slices/rules";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const RulesModal = ({ open, onClose }: IProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [rulesStr, setRulesStr] = useState(
    localStorage.getItem("RULES") ?? "[]"
  );

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRulesStr(event.target.value);
    localStorage.setItem("RULES", event.target.value);
    try {
      const rules = JSON.parse(event.target.value) as Rule[];
      dispatch(setRules(rules));
    } catch (err) {
      console.error(err);
      dispatch(setRules(undefined));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: "50vw" }}>
        <TextField
          multiline
          rows={10}
          sx={{ width: "100%" }}
          onChange={onChange}
          value={rulesStr}
          helperText={<RulesValidation />}
        />
      </Box>
    </Modal>
  );
};
