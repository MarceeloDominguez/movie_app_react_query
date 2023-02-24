import { useQuery } from "react-query";
import { Movie } from "../interfaces/moviesInterface";

const APIKEY = "59fac2f751f32b407b1ccad78a44e44b";

async function getMovies() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES`
  );
  const data = await resp.json();

  return data.results;
}

async function getMoviesPopular() {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=es-ES`
  );
  const data = await resp.json();

  return data.results;
}

export function useMovies() {
  return useQuery<Movie[]>("movies", getMovies);
}

export function useMoviesPopular() {
  return useQuery<Movie[]>("top", getMoviesPopular);
}
