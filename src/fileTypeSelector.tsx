import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import {
  FileType as FTs,
  setFileType,
  useFileType,
} from "./redux/slices/fileType";
import { useDispatch } from "react-redux";

export const FileTypeSelector = (): React.ReactElement => {
  const dispatch = useDispatch();
  const fileType = useFileType();

  const onChange = (event: SelectChangeEvent<string>) => {
    dispatch(setFileType(event.target.value));
  };

  return (
    <Select sx={{ width: "100%" }} value={fileType} onChange={onChange}>
      {Object.values(FTs).map((v) => (
        <MenuItem key={v} value={v}>
          {v}
        </MenuItem>
      ))}
    </Select>
  );
};
