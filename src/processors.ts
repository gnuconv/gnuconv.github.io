import { Transaction } from "./InputFile";
import Papa from "papaparse";

const mdyToYmd = (date: string) => {
  const parts = date.split("/");
  return `${parts[2]}-${parts[0]}-${parts[1]}`;
};

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
    const formatDesc = (desc1: string, desc2: string) => {
      const x = [];
      if (desc1) x.push(desc1.trim());
      if (desc2) x.push(desc2.trim());
      return x.join("/");
    };
    const rows: string[][] = Papa.parse(str)
      .data.slice(1)
      .filter((c: any) => c.length > 1) as unknown as string[][];
    return rows.map((r) => ({
      account: `${r[0]} ${r[1]}`,
      date: mdyToYmd(r[2]),
      description: formatDesc(r[4], r[5]),
      destination: "Expenses:UNKNOWN",
      amount: parseFloat(r[6]),
    }));
  },
};
