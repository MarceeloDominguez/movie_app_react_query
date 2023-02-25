import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { RootStackParams } from "../navigation/Navigation";
import { SharedElement } from "react-navigation-shared-element";
import Icon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useFavoriteMovie } from "../store/moviesFavorites";

const BASE_IMG = "https://image.tmdb.org/t/p";
const { width, height } = Dimensions.get("window");

interface Props
  extends NativeStackScreenProps<RootStackParams, "DetailsScreen"> {}

export default function DetailsScreen({ route }: Props) {
  const movie = route.params;
  const { addMovieToFavorite, removeMovieFromFavorite, movieFavorite } =
    useFavoriteMovie((state) => state);
  const navigation = useNavigation();
  const poster = `${BASE_IMG}/w500${movie.poster_path}`;

  const isFavorite = movieFavorite.includes(movie.id);

  const toggleFavorite = (id: number) => {
    if (isFavorite) {
      removeMovieFromFavorite(id);
      return;
    }
    addMovieToFavorite(id);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={[StyleSheet.absoluteFillObject, { alignItems: "center" }]}>
        <Animated.Image
          source={{ uri: poster }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={50}
        />
        <View>
          <SharedElement id={`${movie.id_shared}.image`}>
            <Image
              source={{ uri: poster }}
              style={styles.poster}
              resizeMode="contain"
            />
          </SharedElement>
        </View>
      </View>
      <View style={styles.wrapIcons}>
        <Icon
          name="chevron-back-outline"
          size={26}
          color="#DC3535"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.wrapIconHeart}>
          <Icon
            name="heart"
            size={26}
            color={isFavorite ? "#DC3535" : "rgba(0,0,0,0.5)"}
            onPress={() => toggleFavorite(movie.id)}
          />
        </View>
      </View>
      <View style={styles.wrapInfoMovie}>
        <Text numberOfLines={2} style={styles.titleMovie}>
          {movie.title}
        </Text>
        <Text style={styles.overview}>
          {movie.overview ? movie.overview : "Without  description"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  poster: {
    width: width * 0.75,
    height: height * 0.6,
    borderRadius: 10,
    marginTop: 100,
  },
  wrapIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginTop: 50,
    alignItems: "center",
  },
  wrapIconHeart: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  wrapInfoMovie: {
    backgroundColor: "rgba(0,0,0,0.3)",
    marginTop: height * 0.65,
    paddingHorizontal: 18,
    alignItems: "center",
    flex: 1,
    paddingVertical: 16,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  titleMovie: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.4,
    color: "#FFF",
    marginBottom: 10,
  },
  overview: {
    textAlign: "center",
    lineHeight: 19,
    color: "#fff",
    opacity: 0.7,
    letterSpacing: 0.3,
  },
});
