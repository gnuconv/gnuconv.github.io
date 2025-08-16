import type { SelectChangeEvent } from "@mui/material";
import { MenuItem, Select } from "@mui/material";
import React from "react";
import {
  FileType,
  selectFileType,
  setFileType,
} from "../redux/slices/fileType";
import { useDispatch } from "react-redux";
import { setTransactionsFileContent } from "../redux/slices/transactionsFileContent";
import { useAppSelector } from "../redux/hooks";

export const FileTypeSelector = (): React.ReactElement => {
  const dispatch = useDispatch();
  const fileType = useAppSelector(selectFileType);

  const onChange = (event: SelectChangeEvent): void => {
    dispatch(setFileType(event.target.value as FileType));
    dispatch(setTransactionsFileContent(""));
  };

  return (
    <Select sx={{ width: "100%" }} value={fileType} onChange={onChange}>
      {Object.values(FileType).map((v) => (
        <MenuItem key={v} value={v}>
          {v}
        </MenuItem>
      ))}
    </Select>
  );
};
