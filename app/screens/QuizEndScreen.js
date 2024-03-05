import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, { PinwheelIn } from "react-native-reanimated";

import { calculateGrade, GradeIcon } from "../components/Grade.js";
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

  let message = "";
  const grade = calculateGrade(score);
  switch (grade) {
    case "A":
      message =
        "That's an excellent score, you clearly understood the information! Go back to the campus and try more quizzes to test yourself on those!";
      break;
    case "B":
      message =
        "Great effort! You can try the quiz again to improve your score and get more stars, otherwise continue to the campus and try more quizzes!";
      break;
    default:
      message =
        "If you want to work to improve your grade you can go back to the campus and read the information for this category, otherwise continue with more quizzes.";
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
          <GradeIcon style={style.gradeContainer} score={score} />
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
