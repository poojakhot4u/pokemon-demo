import { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../api/pokemonApi";

export const usePokemonDetail = (name: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPokemonDetail(name)
      .then((res) => setData(res))
      .catch(() => setError("Error fetching detail"))
      .finally(() => setLoading(false));
  }, [name]);

  return { data, loading, error };
};