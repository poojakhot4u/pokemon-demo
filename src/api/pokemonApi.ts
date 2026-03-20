export const fetchPokemonList = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};