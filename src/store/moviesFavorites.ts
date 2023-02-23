import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type State = {
  movieFavorite: number[];
};

type Action = {
  addMovieToFavorite: (id: number) => void;
  removeMovieFromFavorite: (id: number) => void;
};

export const useFavoriteMovie = create(
  persist<State & Action>(
    (set) => ({
      movieFavorite: [],
      addMovieToFavorite: (id: number) =>
        set((state) => ({ movieFavorite: [...state.movieFavorite, id] })),
      removeMovieFromFavorite: (id: number) =>
        set((state) => ({
          movieFavorite: state.movieFavorite.filter((item) => item !== id),
        })),
    }),
    { name: "movie-favorite", storage: createJSONStorage(() => AsyncStorage) }
  )
);
