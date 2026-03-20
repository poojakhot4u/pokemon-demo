import { usePokemonList } from "../hooks/usePokemonList";

export default function PokemonList() {
  const { data, loading, error } = usePokemonList();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {data.results.map((p: any) => (
        <div key={p.name} data-testid="pokemon-card">
          {p.name}
        </div>
      ))}
    </div>
  );
}