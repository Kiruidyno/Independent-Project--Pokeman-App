import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      getPokemon(data.results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getPokemon = async (results) => {
    try {
      const pokemonData = await Promise.all(
        results.map(async (item) => {
          const res = await fetch(item.url);
          return await res.json();
        })
      );
      setPokeData((state) => {
        state = [...state, ...pokemonData];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="left-content">
          <Card pokemon={pokeData} loading={loading} infoPokemon={(poke) => setPokeDex(poke)} />

          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};

export default Main;
