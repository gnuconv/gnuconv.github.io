import { createContext, useContext } from "react";
import type { Graph } from "./graph";

const emptyGraph: Graph = {
  dims: [0, 0],
  xMargins: [0, 0],
  yMargins: [0, 0],
  xRange: [0, 0],
  yRange: [0, 0],
  yLabels: [],
  xYearsLabels: [],
  xMonthslabels: [],

  lines: [],
};

export const GraphContext = createContext(emptyGraph);

export const useGraph = (): Graph => useContext(GraphContext);
