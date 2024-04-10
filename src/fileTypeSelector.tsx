import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import {
  FileType,
  FileTypes,
  setFileType,
  useFileType,
} from "./redux/slices/fileType";
import { useDispatch } from "react-redux";

export const FileTypeSelector = (): React.ReactElement => {
  const dispatch = useDispatch();
  const fileType = useFileType();

  const onChange = (event: SelectChangeEvent<string>) => {
    dispatch(setFileType(event.target.value as FileType));
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
