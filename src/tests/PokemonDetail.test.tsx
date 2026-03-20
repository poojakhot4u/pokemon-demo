import { render, screen } from "@testing-library/react";
import PokemonDetail from "../pages/PokemonDetail";
import * as ReactRouter from "react-router-dom";

global.fetch = jest.fn();

describe("PokemonDetail", () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, "useParams").mockReturnValue({
      name: "pikachu",
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        name: "pikachu",
        height: 4,
        weight: 60,
      }),
    });
  });

  test("renders pokemon detail", async () => {
    render(<PokemonDetail />);
    expect(await screen.findByText(/height/i)).toBeInTheDocument();
  });

  test("handles error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error());

    render(<PokemonDetail />);
    const err = await screen.findByText(/error/i);
    expect(err).toBeInTheDocument();
  });
});