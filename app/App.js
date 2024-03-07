import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import Constants from "expo-constants"; // REMOVE IN PRODUCTION
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";

import Loading from "./components/Loading.js";
import Campus from "./screens/Campus.js";
import Category from "./screens/Category.js";
import Error from "./screens/Error.js";
import FinalSurvey from "./screens/FinalSurvey.js";
import Gatehouse from "./screens/Gatehouse.js";
import HomeScreen from "./screens/HomeScreen.js";
import Info from "./screens/Info.js";
import InitialSurvey from "./screens/InitialSurvey.js";
import Privacy from "./screens/Privacy.js";
import Question from "./screens/Question.js";
import QuizEndScreen from "./screens/QuizEndScreen.js";
import Terms from "./screens/Terms.js";
import baseStyle from "./styles/base.js";

const Stack = createNativeStackNavigator();

StatusBar.setBarStyle("light-content");
StatusBar.setBackgroundColor(baseStyle.colors.bg1);

global.url =
  process.env.EXPO_PUBLIC_API_URL ||
  "http://" + Constants.expoConfig.hostUri.split(":").shift() + ":1337";
global.api_url = global.url + "/api";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useFonts({
    Playpen: require("./assets/fonts/PlaypenSans.ttf"),
  });

  const [initialStudent, setInitialStudent] = useState(null);

  const fetchData = () => {
    axios
      .get(global.api_url + "/students")
      .then((response) => {
        global.data = response.data;
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    AsyncStorage.getItem("uuid")
      .then((uuid) => (global.uuid = uuid))
      .catch((e) => console.log(e));
    AsyncStorage.getItem("currentStudent")
      .then((id) => {
        if (id !== null) setInitialStudent(Number(id));
      })
      .catch((e) => console.log(e));
  }, []);

  // useEffect(() => {}, [initialStudent]);

  const navigationState = global.uuid
    ? {
        routes: [
          { name: "Gatehouse" },
          initialStudent
            ? {
                name: "Campus",
                params: { student_id: initialStudent },
              }
            : {},
        ],
        index: 1,
      }
    : {
        routes: [{ name: "Home Screen" }],
      };

  return (
    <Loading isLoading={isLoading} isError={error} retry={fetchData}>
      <NavigationContainer theme={DarkTheme} initialState={navigationState}>
        <Stack.Navigator
          screenOptions={{
            animation: "fade",
            presentation: "modal",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: baseStyle.header,
          }}
        >
          <Stack.Screen
            name="Home Screen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Survey"
            component={global.uuid ? FinalSurvey : InitialSurvey}
          />
          <Stack.Screen name="Terms & Conditions" component={Terms} />
          <Stack.Screen name="Privacy Policy" component={Privacy} />
          <Stack.Screen
            name="Gatehouse"
            component={Gatehouse}
            options={{ title: "Pick a Student" }}
          />
          <Stack.Screen name="Campus" component={Campus} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="Error" component={Error} />
          <Stack.Screen
            name="QuizEndScreen"
            component={QuizEndScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Loading>
  );
}
