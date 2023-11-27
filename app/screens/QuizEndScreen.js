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

  let message = "";

  if (score < 50) {
    message = "You can do better. Keep practicing!";
  } else if (score >= 75) {
    message = "Congratulations! You did amazing!";
  } else {
    message = "Good effort! You're on the right track.";
  }

  return (
    <View style={baseStyle.view}>
      <Text style={baseStyle.bigText}>Quiz Completed!</Text>
      <Text style={baseStyle.smallText}>You got {score.toFixed(2)}%, which is {correctAmount} out of {QuestionAmount}</Text>
      <Text style={baseStyle.smallText}>{message}</Text>
      <View style={[baseStyle.buttonContainer, { flexDirection: 'row' }]}>
        <Pressable onPress={retakeQuiz} style={[baseStyle.button, {marginRight: 5}]}>
          <Text style={baseStyle.buttonText}>Retake Quiz</Text>
        </Pressable>
        <Pressable onPress={goToMap} style={baseStyle.button}>
          <Text style={baseStyle.buttonText}>Go back to campus</Text>
        </Pressable>
      </View>
    </View>
  );
}


