import { Transaction } from "./InputFile";
import Papa from "papaparse";
import { FileType } from "../redux/slices/fileType";

const mdyToYmd = (date: string) => {
  const parts = date.split("/");
  return `${parts[2]}-${parts[0]}-${parts[1]}`;
};

const parseCSV = (content: string): string[][] =>
  Papa.parse(content).data as string[][];

export const processors: Record<FileType, (str: string) => Transaction[]> = {
  TD: (str: string) => {
    const rows: string[][] = parseCSV(str).filter(
      (c) => c.length > 1
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
    const rows: string[][] = parseCSV(str)
      .slice(1)
      .filter((c) => c.length > 1) as unknown as string[][];
    return rows.map((r) => ({
      account: `${r[0]} ${r[1]}`,
      date: mdyToYmd(r[2]),
      description: formatDesc(r[4], r[5]),
      destination: "Expenses:UNKNOWN",
      amount: parseFloat(r[6]),
    }));
  },
  DESJARDINS: (str: string) => {
    const rows = parseCSV(str).filter((r) => r.length > 1);

    const parseAmount = (plus: string, minus: string) => {
      if (plus) return -parseFloat(plus);
      return parseFloat(minus);
    };
    return rows.map((r) => ({
      account: `${r[0]}-${r[1]}-${r[2]}`,
      date: r[3].replaceAll("/", "-"),
      description: r[5],
      destination: "Expenses:UNKNOWN",
      amount: parseAmount(r[7], r[8]),
    }));
  },
};
