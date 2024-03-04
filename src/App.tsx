import { Box, Card, Typography } from "@mui/material";
import { FileTypeSelector } from "./fileTypeSelector";
import { EditRules } from "./EditRules";
import { InputFile } from "./InputFile";
import { ProcessFiles } from "./ProcessFiles";

export interface transaction {
  account: string;
  date: string;
  description: string;
  destination: string;
  amount: number;
}

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ display: "flex", flexDirection: "column", p: 4 }}>
        <Box sx={{ p: 2 }}>
          <EditRules />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4">File type</Typography>
          <FileTypeSelector />
        </Box>
        <InputFile />
        <ProcessFiles />
      </Card>
    </Box>
  );
}

export default App;
