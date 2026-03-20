import { render, screen, fireEvent } from "@testing-library/react";
import PokemonList from "../pages/PokemonList";
import * as api from "../api/pokemonApi";

jest.mock("../api/pokemonApi");

const mockData = {
  results: [
    { name: "pikachu" },
    { name: "bulbasaur" },
  ],
};

describe("PokemonList", () => {
  beforeEach(() => {
    jest.spyOn(api, "fetchPokemonList").mockResolvedValue(mockData as any);
  });

  test("renders pokemon list", async () => {
    render(<PokemonList />);
    const items = await screen.findAllByTestId("pokemon-card");
  expect(items.length).toBeGreaterThan(0);
  });

  test("filters pokemon", async () => {
    render(<PokemonList />);
    await screen.findByText("pikachu");

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "pika" } });

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });

  test("shows error", async () => {
    jest
      .spyOn(api, "fetchPokemonList")
      .mockRejectedValueOnce(new Error("error"));

    render(<PokemonList />);
    const err = await screen.findByText(/error/i);
    expect(err).toBeInTheDocument();
  });
});