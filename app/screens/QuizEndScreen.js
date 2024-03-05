import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, { PinwheelIn } from "react-native-reanimated";

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

  let message =
    "If you want to work to improve your grade you can go back to the campus and read the information for this category, otherwise continue with more quizzes.";
  let grade = "";
  if (score < 30) {
    grade = "D";
  } else if (score < 50) {
    grade = "C";
  } else if (score < 80) {
    message =
      "Great effort! You can try the quiz again to improve your score and get more stars, otherwise continue to the campus and try more quizzes!";
    grade = "B";
  } else {
    message =
      "That's an excellent score, you clearly understood the information! Go back to the campus and try more quizzes to test yourself on those!";
    grade = "A";
  }

  return (
    <View style={style.view}>
      {grade && (
        <Animated.View
          style={style.imageContainer}
          entering={PinwheelIn.duration(700)}
        >
          <Image
            source={require("../assets/examResult.png")}
            style={style.image}
          />
          <View style={style.messageContainer}>
            <Text style={style.messageText}>
              Congratulations!{"\n\n"}You finished this quiz and got{" "}
              {correctAmount} of {QuestionAmount}! {message}
            </Text>
          </View>
          <View style={style.gradeContainer}>
            <Image
              source={require("../assets/gradeCircle.png")}
              style={style.gradeImage}
            />
            <Text style={style.gradeText}>{grade}</Text>
          </View>
        </Animated.View>
      )}
      <View style={style.buttonContainer}>
        <Pressable onPress={retakeQuiz} style={style.pressable}>
          <Text style={style.button}>Retake Quiz</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Campus", { student_id })}
          style={style.pressable}
        >
          <Text style={style.button}>Return to Campus</Text>
        </Pressable>
      </View>
    </View>
  );
}
