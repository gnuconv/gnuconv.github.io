// https://www.nceas.ucsb.edu/sites/default/files/2022-06/Colorblind%20Safe%20Color%20Schemes.pdf

// Paul Tol's Muted palette
export const Palette = [
  "#dddddd",
  "#2f2585",
  "#337538",
  "#5da899",
  "#94caec",
  "#dcce7d",
  "#c26a77",
  "#9f4a97",
  "#7e2954",
];

const darker = ([a, b, c]: number[]) => [
  Math.pow(a, 0.96),
  Math.pow(b, 0.96),
  Math.pow(c, 0.96),
];

const toHex = (n: number) => Math.round(n).toString(16).padStart(2, "0");

export const createPalette = (s: string, amt: number) => {
  const m = s.match(/^#([0-9a-f]{6})$/i)![1];
  if (!m) throw new Error("Invalid color");
  const col = [
    parseInt(m.slice(0, 2), 16),
    parseInt(m.slice(2, 4), 16),
    parseInt(m.slice(4, 6), 16),
  ];
  const rgbs = new Array(amt).fill([0, 0, 0]);
  rgbs[0] = darker(col);
  for (let i = 1; i < amt; i++) {
    rgbs[i] = darker(rgbs[i - 1]);
  }
  return rgbs.map(([r, g, b]) => `#${toHex(r)}${toHex(g)}${toHex(b)}`);
};
