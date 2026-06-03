import { Button } from "@mui/material";

export type Transaction = {
  account: string;
  date: string;
  description: string;
  destination: string;
  amount: number;
};

type IProps = {
  isEmpty: boolean;
  onChange: (f: File) => Promise<void>;
};

export const InputFile = ({
  onChange,
  isEmpty,
}: IProps): React.ReactElement => {
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (!event.target.files) return;
    const [file] = event.target.files;
    void onChange(file);
  };

  return (
    <Button variant="contained" component="label">
      {isEmpty ? "UPLOAD" : "CHANGE"}
      <input onChange={handleFileUpload} hidden multiple type="file" />
    </Button>
  );
};
