import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants"; // REMOVE IN PRODUCTION
import React, { useState, useEffect } from "react";
import {
  Text,
  StatusBar,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Categories from "./screens/Categories.js";
import Category from "./screens/Category.js";
import Error from "./screens/Error.js";
import Gatehouse from "./screens/Gatehouse.js";
import HomeScreen from "./screens/HomeScreen.js";
import Info from "./screens/Info.js";
import Privacy from "./screens/Privacy.js";
import Question from "./screens/Question.js";
import QuizEndScreen from "./screens/QuizEndScreen.js";
import Survey from "./screens/Survey.js";
import Terms from "./screens/Terms.js";
import baseStyle from "./styles/base.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  StatusBar.setBarStyle("light-content");

  const fetchData = () => {
    fetch(
      "http://" +
        Constants.expoConfig.hostUri.split(":").shift() +
        ":1337/api/students",
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setError(false);
        global.data = data;
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={baseStyle.view}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={baseStyle.view}>
        <Text style={baseStyle.bigText}>
          Failed to load data, make sure you have an internet connection and try
          again
        </Text>
        <Pressable onPress={fetchData}>
          <Text style={baseStyle.button}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            animation: "fade",
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="Home Screen" component={HomeScreen} />
          <Stack.Screen name="Survey" component={Survey} />
          <Stack.Screen name="Terms & Conditions" component={Terms} />
          <Stack.Screen name="Privacy Policy" component={Privacy} />
          <Stack.Screen name="Gatehouse" component={Gatehouse} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="Error" component={Error} />
          <Stack.Screen
            name="QuizEndScreen"
            component={QuizEndScreen}
            options={{ title: "Quiz Complete" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
