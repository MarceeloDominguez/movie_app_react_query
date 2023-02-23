import React from "react";
import { StyleSheet, Image } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useFavoriteMovie } from "../store/moviesFavorites";

type Props = {
  poster: string;
  POSTER_SIZE_HEIGHT: number;
  id: number;
};

export default function PosterPrimary({
  poster,
  POSTER_SIZE_HEIGHT,
  id,
}: Props) {
  const { addMovieToFavorite, removeMovieFromFavorite, movieFavorite } =
    useFavoriteMovie((state) => state);

  const isFavorite = movieFavorite.includes(id);

  const toggleFavorite = (id: number) => {
    if (isFavorite) {
      removeMovieFromFavorite(id);
      return;
    }

    addMovieToFavorite(id);
  };

  return (
    <>
      <Image
        source={{ uri: poster }}
        style={[styles.poster, { height: POSTER_SIZE_HEIGHT }]}
        resizeMode="contain"
      />
      <Icon
        name="heart"
        size={26}
        style={styles.icon}
        color={isFavorite ? "#DC3535" : "rgba(116, 117, 152, 1)"}
        onPress={() => toggleFavorite(id)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  poster: {
    borderRadius: 16,
  },
  icon: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});
