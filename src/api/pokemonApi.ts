export const fetchPokemonList = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  if (!res.ok) throw new Error("Failed to fetch pokemon");
  return res.json();
};

export const fetchPokemonDetail = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon detail");
  return res.json();
};