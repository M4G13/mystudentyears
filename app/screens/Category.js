import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";

import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { id, student_id } = route.params;
  const category = global.data.data
    .find((s) => s.id === student_id)
    .attributes.category.find((c) => c.id === id);

  const [completion, setCompletion] = useState(null);

  useFocusEffect(
    useCallback(() => {
      async function getCompletion() {
        try {
          let sum = 0;
          const storedCompletion = await AsyncStorage.getItem("quiz" + id);
          if (storedCompletion != null) {
            JSON.parse(storedCompletion).map((x) => (sum += x ? 1 : 0));
            setCompletion(sum);
          } else {
            setCompletion(null);
          }
        } catch (e) {
          console.error("Failed to get progress. " + e);
          setCompletion(null);
        }
      }

      getCompletion();
    }, []),
  );

  return (
    <View style={baseStyle.view}>
      {completion === null ? (
        <>
          <Text style={baseStyle.bigText}>
            This is the {category.Category} section
          </Text>
          <Pressable
            onPress={() =>
              navigation.navigate("Info", {
                index: 0,
                category_id: id,
                student_id,
              })
            }
          >
            <Text style={baseStyle.button}>Start Reading </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("Question", {
                category_id: id,
                student_id,
                question_index: 0,
              })
            }
          >
            <Text style={baseStyle.button}>
              Go to the quiz for this section
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={baseStyle.bigText}>
            You got {completion} out of{" "}
            {category.quiz.data.attributes.questions.length}
          </Text>
          <Pressable
            onPress={() => {
              AsyncStorage.clear();
              navigation.pop();
            }}
          >
            <Text style={baseStyle.button}>Clear all stored data</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
