// https://www.nceas.ucsb.edu/sites/default/files/2022-06/Colorblind%20Safe%20Color%20Schemes.pdf

// https://www.heavy.ai/blog/12-color-palettes-for-telling-better-stories-with-your-data
export const Palette = [
  "#ea5543",
  "#f46c9c",
  "#ef9c1f",
  "#edbe30",
  "#ede05a",
  "#bccf31",
  "#85bb44",
  "#3badef",
  "#b43dc7",
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
