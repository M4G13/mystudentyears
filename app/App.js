import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants"; // REMOVE IN PRODUCTION
import React, { useState, useEffect } from "react";
import { Text, StatusBar } from "react-native";

import Categories from "./screens/Categories.js";
import Category from "./screens/Category.js";
import Gatehouse from "./screens/Gatehouse.js";
import HomeScreen from "./screens/HomeScreen.js";
import Info from "./screens/Info.js";
import Question from "./screens/Question.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  StatusBar.setBarStyle("light-content");

  const fetchData = () => {
    fetch(
      "http://" +
        Constants.expoConfig.hostUri.split(":").shift() +
        ":1337/api/students?populate=deep",
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        global.data = data;
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <Text
        style={{
          fontWeight: 600,
          fontSize: 25,
          textAlign: "center",
          paddingTop: 100,
        }}
      >
        start strapi idiot
      </Text>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          animation: "fade",
          presentation: "transparentModal",
        }}
      >
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Gatehouse" component={Gatehouse} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
