import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import PokemonList from "../pages/PokemonList";
import * as api from "../api/pokemonApi";
import { BrowserRouter } from "react-router-dom";

jest.mock("../api/pokemonApi");

const mockData = {
  results: [
    { name: "pikachu" },
    { name: "bulbasaur" },
  ],
};

describe("PokemonList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchPokemonList as jest.Mock).mockResolvedValue(mockData);
  });

  test("renders loading initially", () => {
    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders pokemon list", async () => {
    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    expect(await screen.findByText("pikachu")).toBeInTheDocument();
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
  });

  test("filters pokemon based on search", async () => {
    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    await screen.findByText("pikachu");

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "pika" } });

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
  });

  test("shows error state", async () => {
    (api.fetchPokemonList as jest.Mock).mockRejectedValueOnce(
      new Error("error")
    );

    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});