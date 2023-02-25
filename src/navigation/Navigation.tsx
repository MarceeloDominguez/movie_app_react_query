import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesListScreen from "../screens/FavoritesListScreen";
import Icon from "@expo/vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { Movie } from "../interfaces/moviesInterface";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

export type RootStackParams = {
  Tabs: undefined;
  DetailsScreen: Movie;
};

const Stack = createSharedElementStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator();
const StackSharedElement = createSharedElementStackNavigator();

const SharedHomeScreen = () => {
  return (
    <StackSharedElement.Navigator screenOptions={{ headerShown: false }}>
      <StackSharedElement.Screen name="HomeScreen" component={HomeScreen} />
    </StackSharedElement.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#DC3535",
        tabBarInactiveTintColor: "rgba(116, 117, 152, 1)",
        tabBarShowLabel: false,
        tabBarStyle: styles.barStyles,
        tabBarIcon: ({ color, focused }) => {
          let iconName: any = "";
          switch (route.name) {
            case "SharedHomeScreen":
              iconName = "home";
              break;
            case "FavoritesListScreen":
              iconName = "heart";
              break;
            case "ProfileScreen":
              iconName = "person";
              break;
          }
          return (
            <>
              <Icon name={iconName} size={25} color={color} />
              <View
                style={[
                  styles.lineBottomIcon,
                  { backgroundColor: focused ? "#DC3535" : null! },
                ]}
              />
            </>
          );
        },
      })}
    >
      <Tab.Screen name="SharedHomeScreen" component={SharedHomeScreen} />
      <Tab.Screen name="FavoritesListScreen" component={FavoritesListScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Tabs"
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{
            cardStyleInterpolator: ({ current: { progress } }) => ({
              useNativeDriver: true,
              cardStyle: {
                opacity: progress,
              },
            }),
          }}
          sharedElements={(route) => {
            const movie = route.params;
            return [{ id: `${movie.id_shared}.image`, animation: "fade" }];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  barStyles: {
    elevation: 0,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderTopWidth: 0,
    bottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    height: 60,
  },
  lineBottomIcon: {
    height: 2,
    width: 25,
    borderRadius: 2,
    marginTop: 5,
  },
});
