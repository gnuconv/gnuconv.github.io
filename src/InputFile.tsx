import { Button } from "@mui/material";

export interface Transaction {
  account: string;
  date: string;
  description: string;
  destination: string;
  amount: number;
}

interface IProps {
  isEmpty: boolean;
  onChange: (f: File) => Promise<void>;
}

export const InputFile = ({ onChange, isEmpty }: IProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    onChange(file);
  };

  return (
    <Button variant="contained" component="label">
      {isEmpty ? "UPLOAD" : "CHANGE"}
      <input onChange={handleFileUpload} hidden multiple type="file" />
    </Button>
  );
};
