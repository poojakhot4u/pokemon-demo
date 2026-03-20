import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PokemonDetail from "../pages/PokemonDetail";
import { MemoryRouter, Routes, Route } from "react-router-dom";

(globalThis.fetch as jest.Mock)
describe("PokemonDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        name: "pikachu",
        height: 4,
        weight: 60,
      }),
    });
  });

  test("renders loading initially", () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders pokemon detail", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("pikachu")).toBeInTheDocument();
    expect(await screen.findByText(/height/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight/i)).toBeInTheDocument();
  });

  test("handles api error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error());

    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});