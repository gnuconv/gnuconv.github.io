import { useDispatch } from "react-redux";
import { InputFile } from "../Converter/InputFile";
import { onGNUFileUploaded, selectHasGNUFile } from "../redux/slices/gnu";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../redux/hooks";

const getFileContent = async (f: File): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ds = new (window as any).DecompressionStream("gzip");
  const decompressedStream = f.stream().pipeThrough(ds);
  const resp = await new Response(decompressedStream).blob();
  return resp.text();
};

export const GNUFileSelector = (): React.ReactElement => {
  const dispatch = useDispatch();
  const hasGNUFile = useAppSelector(selectHasGNUFile);

  const onChange = async (f: File): Promise<void> => {
    const text = await getFileContent(f);
    dispatch(onGNUFileUploaded({ filename: f.name, content: text }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InputFile onChange={onChange} isEmpty={!hasGNUFile} />
      {hasGNUFile && <Typography sx={{ mt: 2 }}>{hasGNUFile}</Typography>}
    </Box>
  );
};
