import type { Transaction } from "./InputFile";
import Papa from "papaparse";
import type { FileType } from "../redux/slices/fileType";

const mdyToYmd = (date: string): string => {
  const parts = date.split("/");
  return `${parts[2]}-${parts[0]}-${parts[1]}`;
};

const twoPadded = (x: number | string): string =>
  (x + "").toString().padStart(2, "0");

const parseCSV = (
  content: string,
  config?: Parameters<typeof Papa.parse>[1],
): string[][] => Papa.parse(content, config).data as string[][];

export const processors: Record<FileType, (str: string) => Transaction[]> = {
  "DESJARDINS CREDIT": (str: string) => {
    const rows = parseCSV(str, { delimiter: "\t" });

    const parseDate = (s: string): string => {
      const date = new Date(Date.parse(s));
      return `${date.getFullYear()}-${twoPadded(date.getMonth() + 1)}-${twoPadded(date.getDate())}`;
    };

    const parseAmount = (s: string): number => {
      const mod = s.includes("CR ") ? -1 : 1;
      const tmp = s.replace("$", "").replace(",", "").replace("CR ", "").trim();

      return mod * parseFloat(tmp);
    };

    return rows.map((r) => ({
      account: "CC",
      date: parseDate(r[0]),
      description: r[1],
      destination: "Expenses:UNKNOWN",
      amount: parseAmount(r[2]),
    }));
  },
  "TD CHECKING": (str: string) => {
    const rows: string[][] = parseCSV(str).filter(
      (c) => c.length > 1,
    ) as unknown as string[][];

    const parseAmount = (row: string[]): number => {
      if (row[2] !== "") return -1 * parseFloat(row[2]);
      if (row[3] !== "") return parseFloat(row[3]);
      return 0;
    };

    return rows.map((r) => {
      return {
        account: "TD",
        date: r[0],
        description: r[1],
        destination: "Expenses:UNKNOWN",
        amount: parseAmount(r),
      };
    });
  },
  "TD CC": (str: string) => {
    const rows: string[][] = parseCSV(str).filter(
      (c) => c.length > 1,
    ) as unknown as string[][];

    const formatDate = (date: string): string => {
      const parts = date.split("/");
      return `${parts[2]}-${parts[0]}-${parts[1]}`;
    };

    const parseAmount = (row: string[]): number => {
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
    const formatDesc = (desc1: string, desc2: string): string => {
      const x = [];
      if (desc1) x.push(desc1.trim());
      if (desc2) x.push(desc2.trim());
      return x.join("/") ?? "";
    };
    const rows: string[][] = parseCSV(str)
      .slice(1)
      .filter((c) => c.length > 1) as unknown as string[][];
    return rows.map((r) => {
      return {
        account: `${r[0]} ${r[1]}`,
        date: mdyToYmd(r[2]),
        description: formatDesc(r[4], r[5]),
        destination: "Expenses:UNKNOWN",
        amount: parseFloat(r[6]),
      };
    });
  },
  DESJARDINS: (str: string) => {
    const rows = parseCSV(str).filter((r) => r.length > 1);

    const parseAmount = (plus: string, minus: string): number => {
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
