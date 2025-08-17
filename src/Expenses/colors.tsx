export const Palette = [
  "#e60049",
  "#3fb6ff",
  "#4ee98f",
  "#e6d600",
  "#9a18f5",
  "#f8a204",
  "#db09b5",
  "#b3d4ff",
  "#3cbda0",
];

type Color = [number, number, number];

const parseColor = (s: string): Color => {
  const m = /^#([0-9a-f]{6})$/i.exec(s)?.[1];
  if (m === undefined) throw new Error("Invalid color");

  const col: Color = [0, 0, 0];
  for (let i = 0; i < hexComponentColorCount; i++) {
    const j = i * hexComponentColorLength;
    col[i] = parseInt(m.slice(j, j + hexComponentColorLength), hexBase);
  }
  return col;
};

const colorToCSS = ([r, g, b]: Color): string =>
  `#${toHex(r)}${toHex(g)}${toHex(b)}`;

// exponent used to make a color darker.
const darkerExpo = 0.96;
const darker = ([a, b, c]: Color): Color => [
  Math.pow(a, darkerExpo),
  Math.pow(b, darkerExpo),
  Math.pow(c, darkerExpo),
];

export const darken = (s: string): string => {
  const col = parseColor(s);
  const d = darker(col);
  return colorToCSS(d);
};
const hexBase = 16;
const hexComponentColorLength = 2;
const hexComponentColorCount = 3;

const toHex = (n: number): string =>
  Math.round(n).toString(hexBase).padStart(hexComponentColorLength, "0");
