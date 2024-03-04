import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUpload } from "./redux/slices/upload";

export interface Transaction {
  account: string;
  date: string;
  description: string;
  destination: string;
  amount: number;
}

export const InputFile = () => {
  const dispatch = useDispatch();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const content = await file.text();
    dispatch(setUpload(content));
  };
  return (
    <Button variant="contained" component="label">
      UPLOAD
      <input onChange={handleFileUpload} hidden multiple type="file" />
    </Button>
  );
};
