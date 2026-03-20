import { useEffect, useState } from "react";
import { fetchPokemonList } from "../api/pokemonApi";

export const usePokemonList = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPokemonList()
      .then((res) => setData(res))
      .catch(() => setError("Error fetching"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};