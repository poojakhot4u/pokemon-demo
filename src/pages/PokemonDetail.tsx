import { useParams } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";

export default function PokemonDetail() {
  const { name } = useParams();
  const { data, loading, error } = usePokemonDetail(name!);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
    </div>
  );
}