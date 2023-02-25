import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useFavoriteMovie } from "../store/moviesFavorites";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Movie } from "../interfaces/moviesInterface";
import { SharedElement } from "react-navigation-shared-element";

type Props = {
  poster: string;
  POSTER_SIZE_HEIGHT: number;
  movie: Movie;
};

export default function PosterPrimary({
  poster,
  POSTER_SIZE_HEIGHT,
  movie,
}: Props) {
  const { addMovieToFavorite, removeMovieFromFavorite, movieFavorite } =
    useFavoriteMovie((state) => state);

  const navigation = useNavigation();

  const isFavorite = movieFavorite.includes(movie.id);

  const toggleFavorite = (id: number) => {
    if (isFavorite) {
      removeMovieFromFavorite(id);
      return;
    }

    addMovieToFavorite(id);
  };

  //nuevo id para el efecto del shared element
  const movieShared = (movie.id_shared = Math.random());

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.dispatch(CommonActions.navigate("DetailsScreen", movie))
      }
    >
      <SharedElement id={`${movieShared}.image`}>
        <Image
          source={{ uri: poster }}
          style={[styles.poster, { height: POSTER_SIZE_HEIGHT }]}
          resizeMode="contain"
        />
      </SharedElement>
      <Icon
        name="heart"
        size={26}
        style={styles.icon}
        color={isFavorite ? "#DC3535" : "rgba(116, 117, 152, 1)"}
        onPress={() => toggleFavorite(movie.id)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  poster: {
    borderRadius: 16,
  },
  icon: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
});
