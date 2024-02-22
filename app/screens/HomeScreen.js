import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable, Image, StatusBar } from "react-native";

import style from "../styles/homescreen.js";

export default function HomeScreen({ navigation }) {
  const [response, setResponse] = useState({});

  StatusBar.setBackgroundColor("#7CCDF3");

  useFocusEffect(
    useCallback(() => {
      async function getResponse() {
        let tempResponse;
        try {
          const storedResponse = await AsyncStorage.getItem("survey");
          tempResponse = JSON.parse(storedResponse);
        } catch (e) {
          console.error("Failed to get response. " + e);
          tempResponse = null;
        }
        setResponse(tempResponse);
      }
      getResponse();
    }, []),
  );

  return (
    <View style={style.view}>
      <View style={style.logoContainer}>
        <Image
          source={require("../assets/HomeScreenBG.png")}
          style={style.bgImage}
        />
      </View>
      <View style={style.bgContainer}>
        <Image
          source={require("../assets/Molly1.png")}
          style={style.mainImage}
        />
      </View>
      <Text style={style.bigText}>Welcome to My Student Years!</Text>
      {response !== null ? (
        <Pressable
          onPress={() => {
            StatusBar.setBackgroundColor(style.colors.bg1);
            navigation.navigate("Gatehouse");
          }}
        >
          <Text style={style.button}>Go to Gatehouse</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            StatusBar.setBackgroundColor(style.colors.bg1);
            navigation.navigate("Survey");
          }}
        >
          <Text style={style.button}>Take the Survey</Text>
        </Pressable>
      )}
    </View>
  );
}
