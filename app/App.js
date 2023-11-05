import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen.js";
import Categories from "./screens/Categories.js";
import Category from "./screens/Category.js";
import Question from "./screens/Question.js";
import Info from "./screens/Info.js"

const Stack = createNativeStackNavigator();

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = "http://192.168.1.169:1337/api/students?populate[0]=category.information&populate[1]=category.quiz.questions.option4&populate[2]=category.quiz.questions.option3&populate[3]=category.quiz.questions.option2&populate[4]=category.quiz.questions.option1";

  const fetchData = () => {
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  global.data = data;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
