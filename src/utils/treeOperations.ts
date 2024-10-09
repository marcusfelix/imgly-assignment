/**
 * Delete a node by its uniqueId
 * @param node 
 * @param id 
 * @returns A boolean indicating if the node was deleted
 */

import { Node } from "../types/node";

export const deleteNodeById = (node: Node[], id: string) => {
  for (let i = 0; i < node.length; i++) {
    if (node[i].uniqueId === id) {
      node.splice(i, 1);
      return true;
    }
    if (node[i].children) {
      if (deleteNodeById(node[i].children ?? [], id)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Add children to a node by its uniqueId
 * @param node 
 * @param id 
 * @param child 
 * @returns A boolean indicating if the children were added
 */
export const addNodeChildren = (node: Node[], id: string, child: Node) => {
  for (let i = 0; i < node.length; i++) {
    if (node[i].uniqueId === id) {
      node[i].children?.push(child);
      return true;
    }
    if (node[i].children) {
      if (addNodeChildren(node[i].children ?? [], id, child)) {
        return true;
      }
    }
  }
  return false;
};