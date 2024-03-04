import React, { useState } from "react";
import { Modal } from "./Modal";
import { Box, TextField } from "@mui/material";
import { RulesValidation } from "./RulesValidation";
import { useDispatch } from "react-redux";
import { setRules } from "./redux/slices/rules";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const RulesModal = ({ open, onClose }: IProps) => {
  const dispatch = useDispatch();
  const [rulesStr, setRulesStr] = useState(
    localStorage.getItem("RULES") ?? "[]"
  );

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRulesStr(event.target.value);
    localStorage.setItem("RULES", event.target.value);
    try {
      const rules = JSON.parse(event.target.value);
      dispatch(setRules(rules));
    } catch (err) {
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
