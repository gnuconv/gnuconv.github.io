import type { GraphNode } from "./treeProcessor";

export const maxDepth = (n: GraphNode): number => {
  if (!n.children?.length) return 1;
  return 1 + Math.max(...(n.children?.map(maxDepth) ?? []));
};
