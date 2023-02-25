import React from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesListScreen from "../screens/FavoritesListScreen";
import Icon from "@expo/vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { Movie } from "../interfaces/moviesInterface";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const { width } = Dimensions.get("window");

export type RootStackParams = {
  Tabs: undefined;
  DetailsScreen: Movie;
};

interface Tab {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  component: () => JSX.Element;
}

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

const tabs: Tab[] = [
  { name: "SharedHomeScreen", icon: "home", component: SharedHomeScreen },
  {
    name: "FavoritesListScreen",
    icon: "heart",
    component: FavoritesListScreen,
  },
  { name: "ProfileScreen", icon: "person", component: ProfileScreen },
];

const Tabs = () => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.barStyles,
        }}
      >
        {tabs.map((item, index) => {
          return (
            <Tab.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              listeners={{
                focus: () => {
                  Animated.spring(offsetAnimation, {
                    toValue: index * (width / tabs.length),
                    useNativeDriver: true,
                  }).start();
                },
              }}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Icon
                      name={item.icon}
                      size={25}
                      color={focused ? "#DC3535" : "rgba(0,0,0,0.5)"}
                    />
                  );
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.lineBottomIcon,
          {
            transform: [{ translateX: offsetAnimation }],
          },
        ]}
      />
    </>
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
    height: 60,
  },
  lineBottomIcon: {
    position: "absolute",
    width: 20,
    height: 2,
    backgroundColor: "red",
    left: width / tabs.length / 2 - 10,
    bottom: 10,
  },
});
