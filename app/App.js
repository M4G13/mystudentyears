import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import Constants from 'expo-constants'; // REMOVE IN PRODUCTION

import Categories from "./screens/Categories.js";
import Category from "./screens/Category.js";
import HomeScreen from "./screens/HomeScreen.js";
import Gatehouse from "./screens/Gatehouse.js";
import Info from "./screens/Info.js";
import Question from "./screens/Question.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = "http://" + Constants.expoConfig.hostUri.split(':').shift() + ":1337/api/students?populate=deep";

  const fetchData = () => {
    fetch(url)
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  global.data = data;

    if (error) {
        return (<Text style={{fontWeight: 600, fontSize: 25, textAlign: "center", paddingTop: 100}}>start strapi idiot</Text>)
    }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Gatehouse" component={Gatehouse} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
