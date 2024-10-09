import { Node } from "../types/node";

/**
 * Traverses the tree setting a unique id for each node and returns the tree
 * @param data Tree data to parse
 * @returns Parsed tree data
 */
export default function parseTreeData(data: Node[]) {
  const traverse = (node: Node): Node => {
    const uniqueId = Math.random().toString(36).toString();
    const children = node.children?.map((child) => traverse(child));
    return { ...node, uniqueId, children };
  }

  return data.map((node) => traverse(node));
}