import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesListScreen from "../screens/FavoritesListScreen";
import Icon from "@expo/vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="StackHome"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#DC3535",
          tabBarInactiveTintColor: "rgba(116, 117, 152, 1)",
          tabBarShowLabel: false,
          tabBarStyle: styles.barStyles,
          tabBarIcon: ({ color, focused }) => {
            let iconName: any = "";
            switch (route.name) {
              case "StackHome":
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
        <Tab.Screen name="StackHome" component={StackHome} />
        <Tab.Screen
          name="FavoritesListScreen"
          component={FavoritesListScreen}
        />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  barStyles: {
    elevation: 0,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.1)",
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
