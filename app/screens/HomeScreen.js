import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable, Image } from "react-native";

import style from "../styles/homescreen.js";

export default function HomeScreen({ navigation }) {
  const [response, setResponse] = useState({});
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
      <Image
        source={require("../assets/msy-logo.png")}
        style={style.mainImage}
      />
      <Text style={style.bigText}>Welcome to My Student Years</Text>
      {response === null ? (
        <Pressable onPress={() => navigation.navigate("Survey")}>
          <Text style={style.button}>Take the survey</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => navigation.navigate("Gatehouse")}>
          <Text style={style.button}>Go to Gatehouse</Text>
        </Pressable>
      )}
    </View>
  );
}
