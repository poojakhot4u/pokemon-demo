import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "../components/PokemonCard";
import { useState } from "react";

export default function PokemonList() {
  const { data, loading, error } = usePokemonList();
  const [search, setSearch] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const filtered = data.results.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Pokemon List</h1>

      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {filtered.map((p: any) => (
          <PokemonCard key={p.name} name={p.name} />
        ))}
      </div>
    </div>
  );
}