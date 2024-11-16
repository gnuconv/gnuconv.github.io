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

const darkerExpo = 0.96;
const darker = ([a, b, c]: number[]): number[] => [
  Math.pow(a, darkerExpo),
  Math.pow(b, darkerExpo),
  Math.pow(c, darkerExpo),
];

const base16 = 16;
const hexComponentColorLength = 2;
const hexComponentColorCount = 3;
const toHex = (n: number): string =>
  Math.round(n).toString(base16).padStart(hexComponentColorLength, "0");

export const createPalette = (s: string, amt: number): string[] => {
  const m = /^#([0-9a-f]{6})$/i.exec(s)?.[1];
  if (m === undefined) throw new Error("Invalid color");

  const col: number[] = [];
  for (let i = 0; i < hexComponentColorCount; i++) {
    const j = i * hexComponentColorLength;
    col.push(parseInt(m.slice(j, j + hexComponentColorLength), base16));
  }

  const rgbs = new Array<number[]>(amt).fill([0, 0, 0]);
  rgbs[0] = darker(col);
  for (let i = 1; i < amt; i++) {
    rgbs[i] = darker(rgbs[i - 1]);
  }
  return rgbs.map(([r, g, b]) => `#${toHex(r)}${toHex(g)}${toHex(b)}`);
};
