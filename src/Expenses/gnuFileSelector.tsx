import { useDispatch } from "react-redux";
import { InputFile } from "../Converter/InputFile";
import { setGNUFile, useGNUFile } from "../redux/slices/gnuFile";
import { Box, Typography } from "@mui/material";

const getFileContent = async (f: File): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ds = new (window as any).DecompressionStream("gzip");
  const decompressedStream = f.stream().pipeThrough(ds);
  const resp = await new Response(decompressedStream).blob();
  return await resp.text();
};

export const GNUFileSelector = () => {
  const dispatch = useDispatch();
  const { filename } = useGNUFile();

  const onChange = async (f: File) => {
    const text = await getFileContent(f);
    dispatch(setGNUFile({ filename: f.name, content: text }));
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
      <InputFile onChange={onChange} isEmpty={!filename} />
      {filename && <Typography sx={{ mt: 2 }}>{filename}</Typography>}
    </Box>
  );
};
