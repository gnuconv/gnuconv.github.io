import type { SelectChangeEvent } from "@mui/material";
import { MenuItem, Select } from "@mui/material";
import React from "react";
import type { FileType } from "../redux/slices/fileType";
import { FileTypes, setFileType, useFileType } from "../redux/slices/fileType";
import { useDispatch } from "react-redux";
import { setTransactionsFileContent } from "../redux/slices/transactionsFileContent";

export const FileTypeSelector = (): React.ReactElement => {
  const dispatch = useDispatch();
  const fileType = useFileType();

  const onChange = (event: SelectChangeEvent): void => {
    dispatch(setFileType(event.target.value as FileType));
    dispatch(setTransactionsFileContent(""));
  };

  return (
    <Select sx={{ width: "100%" }} value={fileType} onChange={onChange}>
      {FileTypes.map((v) => (
        <MenuItem key={v} value={v}>
          {v}
        </MenuItem>
      ))}
    </Select>
  );
};
