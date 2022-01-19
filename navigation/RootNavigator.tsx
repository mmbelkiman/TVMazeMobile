import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Home from "../screens/Home";
import Details from "../screens/Details";
import EpisodeDetails from "../screens/Episode";

const Stack = createSharedElementStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{
            title: "s e r i e s",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#332e59",
            },
          }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={Details}
          options={{
            title: "d e t a i l",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#332e59",
            },
            headerBackTitleVisible: false,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          }}
        />

        <Stack.Screen
          name="EpisodeDetailsScreen"
          component={EpisodeDetails}
          options={{
            title: "e p i s o d e",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#332e59",
            },
            headerBackTitleVisible: false,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
