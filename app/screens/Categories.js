import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable, ImageBackground } from "react-native";

import style from "../styles/categories.js";

export default function Categories({ route, navigation }) {
  const { student_id } = route.params;
  const categories = global.data.data.find((s) => s.id === student_id)
    .attributes.category;
  const locs = {
    Finance: [80, 160],
    Wellbeing: [240, 230],
    Academics: [40, 400],
    Independence: [250, 520],
  };

  const [completed, setCompleted] = useState({});
  useFocusEffect(
    useCallback(() => {
      async function getCompletion() {
        const complete = {};
        for (const category of categories) {
          try {
            const storedCompletion = await AsyncStorage.getItem(
              "quiz" + category.id,
            );
            complete[category.id] = storedCompletion != null;
          } catch (e) {
            console.error("Failed to get progress. " + e);
            complete[category.id] = false;
          }
        }
        setCompleted(complete);
      }
      getCompletion();
    }, []),
  );

  const imageSource = require("../assets/temp_map.png");

  return (
    <View style={style.view}>
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={style.map}
      >
        {categories.map((c) => (
          <Pressable
            key={c.id}
            onPress={() =>
              navigation.navigate("Category", {
                id: c.id,
                student_id,
              })
            }
            style={[
              style.pressable,
              {
                left: locs[c.Category][0],
                top: locs[c.Category][1],
              },
            ]}
          >
            <Text style={style.button}>
              {c.Category}
              {completed[c.id] ? " - done" : null}
            </Text>
          </Pressable>
        ))}

        <Pressable
          onPress={async () => {
            await AsyncStorage.clear();
            setCompleted({});
          }}
          style={style.clearButton}
        >
          <Text style={style.button}>Clear all stored data</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}
