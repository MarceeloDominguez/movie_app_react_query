import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useMoviesPopular } from "../hooks/useMovies";

const BASE_IMG = "https://image.tmdb.org/t/p";

export default function PosterSecondary() {
  const { data: movies } = useMoviesPopular();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trends</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 5 }}
      >
        {movies?.map((item) => {
          const poster = `${BASE_IMG}/w500${item.poster_path}`;

          return (
            <View key={item.id}>
              <Image
                source={{ uri: poster }}
                style={styles.poster}
                resizeMode="stretch"
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
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
