import { render, screen } from "@testing-library/react";
import PokemonDetail from "../pages/PokemonDetail";

test("renders pokemon detail", async () => {
  render(<PokemonDetail />);
  expect(await screen.findByText(/height/i)).toBeInTheDocument();
});