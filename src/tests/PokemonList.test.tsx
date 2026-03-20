import { render, screen, fireEvent } from "@testing-library/react";
import PokemonList from "../pages/PokemonList";

// Mock API response
const mockData = {
  results: [
    { name: "pikachu" },
    { name: "bulbasaur" },
    { name: "charmander" },
  ],
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData),
  } as Response)
) as jest.Mock;

test("renders pokemon list", async () => {
  render(<PokemonList />);
  const items = await screen.findAllByTestId("pokemon-card");
  expect(items.length).toBeGreaterThan(0);
});

test("filters pokemon based on search input", async () => {
  render(<PokemonList />);

  // Wait for data to load
  const allCards = await screen.findAllByTestId("pokemon-card");
  expect(allCards.length).toBe(3);

  // Find input
  const input = screen.getByPlaceholderText("Search");

  // Type "pika"
  fireEvent.change(input, { target: { value: "pika" } });

  // Only pikachu should remain
  const filtered = await screen.findAllByTestId("pokemon-card");

  expect(filtered.length).toBe(1);
  expect(screen.getByText("pikachu")).toBeInTheDocument();
});