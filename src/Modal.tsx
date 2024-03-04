import { Card } from "@mui/material";
import React from "react";
import { Modal as M } from "@mui/material";

interface IProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
};

export const Modal = ({ open, onClose, children }: IProps) => {
  return (
    <M open={open} onClose={onClose}>
      <Card sx={style}>{children}</Card>
    </M>
  );
};
