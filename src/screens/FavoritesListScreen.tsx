import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useMovies, useMoviesPopular } from "../hooks/useMovies";
import { useFavoriteMovie } from "../store/moviesFavorites";
import { Movie } from "../interfaces/moviesInterface";

const BASE_IMG = "https://image.tmdb.org/t/p";

export default function FavoritesListScreen() {
  const { movieFavorite, removeMovieFromFavorite } = useFavoriteMovie(
    (state) => state
  );
  const { data: movies } = useMovies();
  const { data: moviesPopular } = useMoviesPopular();

  const filterMovie = movieFavorite.map((favorite) => {
    return movies?.filter((item) => item.id === favorite);
  });

  const filterMoviePopular = movieFavorite.map((favorite) => {
    return moviesPopular?.filter((item) => item.id === favorite);
  });

  const favoriteMoviesList = filterMovie
    .concat(filterMoviePopular)
    .flat()
    .sort(() => {
      return Math.random() - 0.5;
    }) as Movie[];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        {movieFavorite.length !== 0
          ? "My favorite movies"
          : "No favorite movies"}
      </Text>
      <View style={{ marginBottom: 100 }}>
        {favoriteMoviesList.map((favorite, index) => {
          const poster = `${BASE_IMG}/w500${favorite.poster_path}`;

          return (
            <View key={index} style={styles.wrapItem}>
              <View style={styles.containerPoster}>
                <Image
                  source={{ uri: poster }}
                  style={styles.poster}
                  resizeMode="center"
                />
                <View style={styles.wrapIconPlay}>
                  <Icon name="play-circle-outline" size={35} color="#202020" />
                </View>
              </View>
              <View style={styles.wrapText}>
                <Text numberOfLines={2} style={styles.titleMovie}>
                  {favorite.title}
                </Text>
                <Text numberOfLines={4} style={styles.overview}>
                  {favorite.overview ? favorite.overview : "Without details"}
                </Text>
              </View>
              <Icon
                name="heart"
                size={25}
                color="#DC3535"
                style={styles.iconHeart}
                onPress={() => removeMovieFromFavorite(favorite.id)}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#202020",
  },
  title: {
    paddingHorizontal: 14,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 12,
    color: "#EEEEEE",
    marginTop: 50,
  },
  wrapItem: {
    marginVertical: 10,
    marginHorizontal: 14,
    flexDirection: "row",
  },
  poster: {
    width: 120,
    height: 150,
    borderRadius: 10,
  },
  wrapText: {
    flex: 1,
    paddingLeft: 14,
  },
  titleMovie: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: "#EEEEEE",
    marginBottom: 5,
    opacity: 0.9,
  },
  overview: {
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.3,
    fontWeight: "500",
    color: "#fff",
    opacity: 0.5,
  },
  iconHeart: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  containerPoster: {
    alignItems: "center",
    justifyContent: "center",
  },
  wrapIconPlay: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255, 0.5)",
    padding: 5,
    borderRadius: 100,
  },
});
