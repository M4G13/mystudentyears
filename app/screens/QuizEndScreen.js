import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Pressable } from "react-native";
import * as Progress from "react-native-progress";

import style from "../styles/quizendscreen.js";

export default function QuizEndScreen({ route, navigation }) {
  const { category_id, student_id, score, correctAmount, QuestionAmount } =
    route.params;

  const retakeQuiz = async () => {
    try {
      await AsyncStorage.removeItem("quiz" + category_id);
      navigation.navigate("Question", {
        category_id,
        student_id,
        index: 0,
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
    <View style={style.view}>
      <Progress.Circle size={200} progress={score.toFixed(2)/100} thickness={10} showsText={true} strokeCap={"round"}/>
      <View style={style.card}>
        <Text style={style.bigText}>Quiz Completed!</Text>
        <Text style={style.smallText}>
          You got {score.toFixed(2)}%, which is {correctAmount} out of{" "}
          {QuestionAmount}
        </Text>
        <Text style={style.smallText}>{message}</Text>
        <View style={[style.buttonContainer, { flexDirection: "row" }]}>
          <Pressable
            onPress={retakeQuiz}
            style={[style.button, { marginRight: 5 }]}
          >
            <Text style={style.buttonText}>Retake Quiz</Text>
          </Pressable>
          <Pressable onPress={goToMap} style={style.button}>
            <Text style={style.buttonText}>Go back to campus</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
