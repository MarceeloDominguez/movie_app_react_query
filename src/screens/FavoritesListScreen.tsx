import React from "react";
import { View, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useMovies } from "../hooks/useMovies";
import { useFavoriteMovie } from "../store/moviesFavorites";

export default function FavoritesListScreen() {
  const { movieFavorite, removeMovieFromFavorite } = useFavoriteMovie(
    (state) => state
  );
  const { data: movies } = useMovies();

  return (
    <View>
      {movieFavorite.map((favorite, index) => {
        const filteredMovieFavorite = movies?.find(
          (item) => item.id === favorite
        );

        return (
          <View key={index} style={{ marginTop: 50 }}>
            <Text>{filteredMovieFavorite?.title}</Text>
            <Icon
              name="heart"
              size={25}
              color="#DC3535"
              onPress={() =>
                removeMovieFromFavorite(filteredMovieFavorite?.id!)
              }
            />
          </View>
        );
      })}
    </View>
  );
}
