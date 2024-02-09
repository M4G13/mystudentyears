import React from "react";
import { View, Text, Pressable } from "react-native";
import * as Progress from "react-native-progress";

import style from "../styles/quizendscreen.js";

export default function QuizEndScreen({ route, navigation }) {
  const { category_id, student_id, score, correctAmount, QuestionAmount } =
    route.params;

  const retakeQuiz = async () => {
    navigation.navigate("Question", {
      category_id,
      student_id,
      index: 0,
    });
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
      <View style={style.questionWrapper}>
        <Progress.Circle
          size={200}
          progress={score / 100}
          thickness={10}
          color={style.colors.fg2}
          formatText={() => score.toFixed(1) + "%"}
          showsText
          strokeCap="round"
        />
        <Text style={style.bigText}>Quiz Completed!</Text>
        <Text style={style.smallText}>
          You got {score.toFixed(2)}%, which is {correctAmount} out of{" "}
          {QuestionAmount}
        </Text>
        <Text style={style.smallText}>{message}</Text>
        <View style={style.buttonContainer}>
          <Pressable onPress={retakeQuiz} style={style.pressable}>
            <Text style={style.button}>Retake Quiz</Text>
          </Pressable>
          <Pressable onPress={goToMap} style={style.pressable}>
            <Text style={style.button}>Go back to campus</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
