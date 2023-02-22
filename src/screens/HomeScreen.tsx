import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
} from "react-native";
import { useMovies } from "../hooks/useMovies";
import { Movie } from "../interfaces/moviesInterface";

const { width, height } = Dimensions.get("window");

const POSTER_SIZE_WIDTH = width * 0.7;
const POSTER_SIZE_HEIGHT = height * 0.4;

const SPACING = 10;
const SPACER_ITEM_SIZE = (width - POSTER_SIZE_WIDTH) / 2;

const BASE_IMG = "https://image.tmdb.org/t/p";

export default function HomeScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { data: movies, isLoading, isFetching } = useMovies();

  const [spacerMovie, setSpacerMovie] = useState<Movie[]>([
    { key: "left-spacer" } as any,
    ...movies!,
    { key: "right-spacer" },
  ]);

  if (isLoading) {
    return (
      <Text
        style={{ fontSize: 40, alignItems: "center", justifyContent: "center" }}
      >
        Cargando...
      </Text>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.absoluteFillObject}>
        {movies?.map((item, index) => {
          const poster = `${BASE_IMG}/w500${item.poster_path}`;

          const inputRange = [
            (index - 1) * POSTER_SIZE_WIDTH,
            index * POSTER_SIZE_WIDTH,
            (index + 1) * POSTER_SIZE_WIDTH,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={item.id}
              source={{ uri: poster }}
              style={[StyleSheet.absoluteFillObject, { opacity: opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={spacerMovie}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 100 }}
        snapToInterval={POSTER_SIZE_WIDTH}
        decelerationRate={0}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const poster = `${BASE_IMG}/w500${item.poster_path}`;

          if (!item.poster_path) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * POSTER_SIZE_WIDTH,
            (index - 1) * POSTER_SIZE_WIDTH,
            index * POSTER_SIZE_WIDTH,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });

          return (
            <View
              style={{
                width: POSTER_SIZE_WIDTH,
              }}
            >
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  marginTop: 50,
                  padding: SPACING * 2,
                  backgroundColor: "transparent",
                  transform: [{ translateY }],
                }}
              >
                <Image
                  source={{ uri: poster }}
                  style={styles.poster}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    height: POSTER_SIZE_HEIGHT,
    borderRadius: 16,
  },
});
