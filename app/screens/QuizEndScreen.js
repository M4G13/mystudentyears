import React from "react";
import { View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseStyle from "../styles/base.js";

export default function QuizEndScreen({ route, navigation }) {
  const { category_id, student_id, score, correctAmount, QuestionAmount } = route.params;

  const retakeQuiz = async () => {
    try {
      await AsyncStorage.removeItem("quiz" + category_id);
      navigation.navigate("Question", {
        category_id,
        student_id,
        question_index: 0,
      });
    } catch (error) {
      console.error("Failed to clear progress. " + error);
    }
  };

  const goToMap = () => {
    navigation.navigate("Categories", { student_id });
  };

  return (
    <View style={baseStyle.view}>
      <Text style={baseStyle.bigText}>Quiz Completed!</Text>
      <Text style={baseStyle.bigText}>Your Score: {score.toFixed(2)}%</Text>
      <Text style={baseStyle.bigText}>You got {correctAmount} out of {QuestionAmount} </Text>
      <Pressable onPress={retakeQuiz}>
        <Text style={baseStyle.button}>Retake Quiz</Text>
      </Pressable>
      <Pressable onPress={goToMap}>
        <Text style={baseStyle.button}>Go back to campus</Text>
      </Pressable>
    </View>
  );
}


