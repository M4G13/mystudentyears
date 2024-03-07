import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";

import { getData } from "../common.js";
import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { category } = getData(route.params);

  const [completion, setCompletion] = useState(null);
  const [infoCompletion, setInfoCompletion] = useState(null);

  useFocusEffect(
    useCallback(() => {
      async function getCompletion() {
        try {
          const infoCompletion = await AsyncStorage.getItem(
            "info" + category.id,
          );
          setInfoCompletion(infoCompletion);
        } catch (e) {
          console.error("Failed to get info page completion" + e);
          setInfoCompletion(null);
        }

        try {
          let sum = 0;
          const quizCompletion = await AsyncStorage.getItem(
            "quiz" + category.id,
          );
          if (quizCompletion != null) {
            JSON.parse(quizCompletion).map((x) => (sum += x ? 1 : 0));
            setCompletion(sum);
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
      <>
        <Text style={baseStyle.bigText}>
          This is the {category.Category} section
        </Text>
        {completion !== null && (
          <Text style={baseStyle.bigText}>
            Previously you got {completion} out of{" "}
            {category.quiz.questions.length}
          </Text>
        )}
        <Pressable
          onPress={() =>
            navigation.navigate("Info", {
              ...route.params,
              index: 0,
            })
          }
        >
          <Text style={baseStyle.button}>Start Reading</Text>
        </Pressable>

        {infoCompletion !== null && (
          <Pressable
            onPress={() => {
              navigation.navigate("Question", {
                ...route.params,
                index: 0,
              });
            }}
          >
            <Text style={baseStyle.button}>
              {completion ? "Retake Quiz" : "Start Quiz"}
            </Text>
          </Pressable>
        )}
      </>
    </View>
  );
}
