import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";

import { getData } from "../common.js";
import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { category } = getData(route.params);

  const [completion, setCompletion] = useState(null);

  useFocusEffect(
    useCallback(() => {
      async function getCompletion() {
        try {
          let sum = 0;
          const storedCompletion = await AsyncStorage.getItem(
            "quiz" + category.id,
          );
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

  const clearQuizProgress = async () => {
    try {
      await AsyncStorage.removeItem("quiz" + category.id);
      setCompletion(null);
      startQuiz();
    } catch (error) {
      console.error("Failed to clear quiz progress. " + error);
    }
  };

  const startQuiz = () => {
    navigation.navigate("Question", {
      ...route.params,
      index: 0,
    });
  };

  const navigateToInfo = () => {
    navigation.navigate("Info", {
      ...route.params,
      index: 0,
    });
  };

  return (
    <View style={baseStyle.view}>
      <>
        <Text style={baseStyle.bigText}>
          This is the {category.Category} section
        </Text>
        {completion !== null && (
          <Text style={baseStyle.bigText}>
            Previously you got {completion} out of{" "}
            {category.quiz.data.attributes.questions.length}
          </Text>
        )}
        <Pressable onPress={navigateToInfo}>
          <Text style={baseStyle.button}>Start Reading</Text>
        </Pressable>
        {completion === null && (
          <Pressable onPress={startQuiz}>
            <Text style={baseStyle.button}>Start Quiz</Text>
          </Pressable>
        )}
        {completion !== null && (
          <Pressable onPress={clearQuizProgress}>
            <Text style={baseStyle.button}>Retake Quiz</Text>
          </Pressable>
        )}
      </>
    </View>
  );
}
