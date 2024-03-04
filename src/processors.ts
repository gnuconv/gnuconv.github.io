import { Transaction } from "./InputFile";
import Papa from "papaparse";

export const processors: Record<string, (str: string) => Transaction[]> = {
  TD: (str: string) => {
    const rows: string[][] = Papa.parse(str).data.filter(
      (c: any) => c.length > 1
    ) as unknown as string[][];

    const formatDate = (date: string) => {
      const parts = date.split("/");
      return `${parts[2]}-${parts[0]}-${parts[1]}`;
    };

    const parseAmount = (row: string[]) => {
      if (row[2] !== "") return -1 * parseFloat(row[2]);
      if (row[3] !== "") return parseFloat(row[3]);
      return 0;
    };

    return rows.map((r) => {
      return {
        account: "TD",
        date: formatDate(r[0]),
        description: r[1],
        destination: "Expenses:UNKNOWN",
        amount: parseAmount(r),
      };
    });
  },
  RBC: (str: string) => {
    return [];
  },
};
