import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import fetchData from "../services/fetchData";
import { Node } from "../types/node";
import parseTreeData from "../utils/parseTreeData";
import { addNodeChildren, deleteNodeById } from "../utils/treeOperations";

type TreeContextType = {
  tree: Node[];
  setTree: (tree: Node[]) => void;
  selected: Node | null;
  setSelected: (node: Node | null) => void;
  moveNodeFromTo: (from: Node, to: Node) => void;
  loading: boolean;
  error: Error | null;
};

const TreeContext = createContext<TreeContextType>({} as TreeContextType);

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const [tree, setTree] = useState<Node[]>([]);
  const [selected, setSelected] = useState<Node | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchRemoteTreeData();
  }, [])

  useEffect(() => {
    console.info("Tree updated", tree);
  }, [tree])

  /**
   * Fetch the remote tree data and set it to the state
   */
  const fetchRemoteTreeData = async () => {
    try {
      setLoading(true);
      const data = await fetchData<Node[]>("https://ubique.img.ly/frontend-tha/data.json")
      const parsedData = parseTreeData(data);
      setTree(parsedData);
    } catch(error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Remove node "from" and add it as a child of node "to"
   * @param from 
   * @param to 
   */
  const moveNodeFromTo = (from: Node, to: Node) => {
    setTree((prev) => {
      const copy = [...prev];
      deleteNodeById(copy, from.uniqueId);
      addNodeChildren(copy, to.uniqueId, from);
      return copy;
    })
  }

  const exportObject: TreeContextType = {
    tree,
    setTree,
    selected,
    setSelected,
    moveNodeFromTo,
    loading,
    error
  }

  return <TreeContext.Provider value={exportObject}>
    {children}
  </TreeContext.Provider>;
}

export const useTree = () => useContext(TreeContext);