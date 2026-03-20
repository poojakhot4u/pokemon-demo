import { Link } from "react-router-dom";

type Props = {
  name: string;
};

export default function PokemonCard({ name }: Props) {
  return (
    <Link to={`/pokemon/${name}`}>
      <div
        data-testid="pokemon-card"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "5px",
          cursor: "pointer",
        }}
      >
        {name}
      </div>
    </Link>
  );
}