import { render, screen } from "@testing-library/react";
import PokemonList from "../pages/PokemonList";

test("renders pokemon list", async () => {
  render(<PokemonList />);
  const items = await screen.findAllByTestId("pokemon-card");
  expect(items.length).toBeGreaterThan(0);
});