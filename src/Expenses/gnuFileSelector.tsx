import { useDispatch } from "react-redux";
import { InputFile } from "../Converter/InputFile";
import { setGNUFile, useGNUFile } from "../redux/slices/gnuFile";
import { Box, Typography } from "@mui/material";

const getFileContent = async (f: File): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const ds = new (window as any).DecompressionStream("gzip");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const decompressedStream = f.stream().pipeThrough(ds);
  const resp = await new Response(decompressedStream).blob();
  return resp.text();
};

export const GNUFileSelector = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { filename } = useGNUFile();

  const onChange = async (f: File): Promise<void> => {
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
