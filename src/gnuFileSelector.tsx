import { useDispatch } from "react-redux";
import { InputFile } from "./InputFile";
import { setGNUFile, useGNUFile } from "./redux/slices/gnuFile";
import { Box, Typography } from "@mui/material";

export const GNUFileSelector = () => {
  const dispatch = useDispatch();
  const { filename } = useGNUFile();

  const onChange = async (f: File) => {
    let ds = new (window as any).DecompressionStream("gzip");
    let decompressedStream = f.stream().pipeThrough(ds);
    const resp = await new Response(decompressedStream).blob();
    const text = await resp.text();
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
