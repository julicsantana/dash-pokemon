import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

import Pokemon from "../../models/Pokemon";
import { getPokemons } from "../../services/PokemonService";
import { RootState } from "../../store";
import {
  setError,
  setLoading,
  setPokemonList,
} from "../../features/pokemon/pokemonSlice";

import PageHeader from "../../components/PageHeader";
import ListPokemon from "../../components/ListPokemon";
import SearchBar from "../../components/SearchBar";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pokemonList = useSelector(
    (state: RootState) => state.pokemon.pokemonList,
  );
  const loading = useSelector((state: RootState) => state.pokemon.loading);
  const error = useSelector((state: RootState) => state.pokemon.error);

  const [search, setSearch] = useState<string>("");
  const [pokemonsFiltered, setPokemonsFiltered] =
    useState<Pokemon[]>(pokemonList);

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  useEffect(() => {
    if (pokemonList.length <= 0) {
      dispatch(setLoading(true));
      getPokemonList();
    }
  }, [dispatch, pokemonList]);

  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    filterPokemonList(searchValue);
  };

  const getPokemonList = () => {
    getPokemons()
      .then((data) => {
        setPokemonsFiltered(data);
        dispatch(setPokemonList(data));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setError("Error. Could not load Pokémons. " + err));
        dispatch(setLoading(false));
      });
  };

  const redirectToDetails = () => {
    if (search?.length < 1) return;
    navigate(`/${search?.toLowerCase()}`);
  };

  const filterPokemonList = (value: string) => {
    const filteredList = pokemonList.filter(
      (pokemon: Pokemon) =>
        pokemon.name.includes(value) || pokemon.url?.includes(value),
    );
    setPokemonsFiltered(filteredList);
  };

  return (
    <Layout>
      <PageHeader>
        <SearchBar
          placeholder="Search by name or id..."
          onChange={onInputValueChange}
          onSearch={redirectToDetails}
        />
      </PageHeader>
      <Layout.Content>
        <ListPokemon data={pokemonsFiltered} loading={loading} />
      </Layout.Content>
    </Layout>
  );
}
