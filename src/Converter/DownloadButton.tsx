import React from "react";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import DownloadIcon from "@mui/icons-material/Download";
import type { Transaction } from "./InputFile";

interface IProps {
  AccountName: string;
  Transactions: Transaction[];
}

export const DownloadButton = ({
  AccountName,
  Transactions,
}: IProps): React.ReactElement => {
  const onClick = (): void => {
    const lines = Papa.unparse(Transactions, { header: false });
    const blob = new Blob([lines], {
      type: "text/plain",
    });
    saveAs(blob, `${AccountName}.csv`);
  };
  return (
    <Button onClick={onClick}>
      {AccountName}.csv <DownloadIcon />
    </Button>
  );
};
