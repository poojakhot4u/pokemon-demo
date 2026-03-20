import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PokemonDetail() {
  const { name } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then(setData);
  }, [name]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Height: {data.height}</p>
    </div>
  );
}