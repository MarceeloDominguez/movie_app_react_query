import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useMoviesPopular } from "../hooks/useMovies";
import { SharedElement } from "react-navigation-shared-element";
import { CommonActions, useNavigation } from "@react-navigation/native";

const BASE_IMG = "https://image.tmdb.org/t/p";

export default function PosterSecondary() {
  const { data: movies } = useMoviesPopular();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trends</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 5 }}
      >
        {movies?.map((movie) => {
          const poster = `${BASE_IMG}/w500${movie.poster_path}`;
          //nuevo id para el efecto del shared element
          const movieShared = (movie.id_shared = Math.random());

          return (
            <TouchableOpacity
              key={movie.id}
              activeOpacity={1}
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate("DetailsScreen", movie)
                )
              }
            >
              <SharedElement id={`${movieShared}.image`}>
                <Image
                  source={{ uri: poster }}
                  style={styles.poster}
                  resizeMode="stretch"
                />
              </SharedElement>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 5,
    paddingBottom: 10,
  },
  title: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.4,
    color: "#FFF",
    opacity: 0.9,
  },
  poster: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
