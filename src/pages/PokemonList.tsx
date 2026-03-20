import { usePokemonList } from "../hooks/usePokemonList";
  import { useState } from "react";

export default function PokemonList() {
  const { data, loading, error } = usePokemonList();
const [search, setSearch] = useState("");

const filtered = data.results.filter((p: any) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
    <input
  placeholder="Search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      {data.results.map((p: any) => (
        <div key={p.name} data-testid="pokemon-card">
          {p.name}
        </div>
      ))}
    </div>
  );
}