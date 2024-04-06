import { Button } from "@mui/material";

export interface Transaction {
  account: string;
  date: string;
  description: string;
  destination: string;
  amount: number;
}

interface IProps {
  onUpload: (f: File) => void;
}

export const InputFile = ({ onUpload }: IProps) => {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    onUpload(file);
  };
  return (
    <Button variant="contained" component="label">
      UPLOAD
      <input onChange={handleFileUpload} hidden multiple type="file" />
    </Button>
  );
};
