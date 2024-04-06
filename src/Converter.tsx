import { FileTypeSelector } from "./fileTypeSelector";
import { EditRules } from "./EditRules";
import { InputFile } from "./InputFile";
import { ProcessFiles } from "./ProcessFiles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { setUpload } from "./redux/slices/upload";
import { useDispatch } from "react-redux";

export const Converter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Box sx={{ p: 2 }}>
        <EditRules />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4">File type</Typography>
        <FileTypeSelector />
      </Box>
      <InputFile
        onUpload={async (f: File) => {
          const content = await f.text();
          dispatch(setUpload(content));
        }}
      />
      <ProcessFiles />
    </>
  );
};
