import { useEffect, useState } from "react";
import fetchData from "../services/fetchData";
import { Node } from "../types/node";
import { Details } from "../types/details";

export default function useFetchDetails(node: Node | null) {
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if(node !== null) {
      if(node.id !== undefined) {
        fetchDetails(node);
      }
    }
    
    // Cleanup everything when the component unmounts
    return () => {
      setDetails(null);
      setLoading(false);
      setError(null);
    }
  }, [node])

  const fetchDetails = async (node: Node) => {
    try {
      setLoading(true);
      const data = await fetchData<Details>(`https://ubique.img.ly/frontend-tha/entries/${node.id}.json`)
      setDetails(data);
    } catch(error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { details, loading, error };
}