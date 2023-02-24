import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#eeeeee",
    fontSize: 18,
  },
});
