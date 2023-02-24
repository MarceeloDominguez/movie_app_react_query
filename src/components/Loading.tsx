import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#DC3535" size={50} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202020",
  },
});
