"use client";

import { useState } from "react";
import PokedexBackground from "./components/PokedexBackground";

export default function Pokedex() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const searchPokemon = async () => {
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/pokemon?query=${query}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error fetching data");
    }
  };

  return (
    <PokedexBackground>
      <div className="absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2  py-60">
        <h1 className="text-4xl font-bold text-center mb-6 text-cyan-500">
          Pokédex
        </h1>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Buscar por nombre, ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={searchPokemon}
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Buscar
          </button>

          {error && <p className="text-orange-300 mt-4">{error}</p>}

          {result && (
            <div className="mt-6 bg-blue-500 p-4 rounded-3xl shadow">
              <img
                src={result.image}
                alt={result.name}
                className="w-32 h-32 mx-auto mb-4 size-11"
              />
              <h2 className="text-xl font-bold text-center text-white uppercase">
                {result.name} (ID: {result.id})
              </h2>
              <p className="text-center font-semibold text-white">
                <strong>Tipos:</strong> {result.types.join(", ").toUpperCase()}
              </p>
              <p className="text-center font-mono text-white">
                <strong className="font-semibold">Debilidades:</strong>{" "}
                {result.weaknesses.join(", ").toUpperCase()}
              </p>
              <p className="text-center font-mono text-white bg-o">
                <strong className="font-semibold">Fortalezas:</strong>{" "}
                {result.strengths.join(", ").toUpperCase()}
              </p>
              <p className="text-center font-mono text-white bg-blue-700 p-1 rounded-lg">
                <strong className="font-semibold">Evoluciones:</strong>{" "}
                {result.evolutions.join(" → ").toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </PokedexBackground>
  );
}
