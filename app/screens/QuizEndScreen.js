import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, ImageBackground, Animated } from "react-native";

import style from "../styles/quizendscreen.js";

export default function QuizEndScreen({ route, navigation }) {
  const { category_id, student_id, score, correctAmount, QuestionAmount } =
    route.params;

  const scaleAnimation = useRef(new Animated.Value(5)).current;

  useEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: 3.5,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

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
  let gradeImage = require("../assets/C.png");

  if (score < 50) {
    message = "You can do better. Keep practicing!";
    gradeImage = require("../assets/C.png");
  } else if (score >= 75) {
    message = "Congratulations! You did amazing!";
    gradeImage = require("../assets/A.png");
  } else {
    message = "Good effort! You're on the right track.";
    gradeImage = require("../assets/B.png");
  }

  return (
    <ImageBackground
      source={require("../assets/examResult.png")}
      style={style.view}
      resizeMode="stretch"
    >
      <View style={style.questionWrapper}>
        <Text style={style.studentIDText}>Student ID: {student_id} </Text>
        <Text style={style.subjectIDText}>Subject ID: {category_id} </Text>
        <Text style={style.bigText}> Official Result </Text>
        <Animated.Image
          source={gradeImage}
          style={[
            style.gradeImage,
            {
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        />
        <Text style={style.smallText1}>
          You Scored: {score.toFixed(2)}%, You got {correctAmount} /{" "}
          {QuestionAmount} correct
        </Text>
        <Text style={style.feedback}>Feedback from the marker:</Text>
        <Text style={style.smallText2}>{message}</Text>
        <View style={style.buttonContainer}>
          <Pressable onPress={retakeQuiz} style={style.pressable}>
            <Text style={style.button}>Try Again - Beat Your Score!</Text>
          </Pressable>
          <Pressable onPress={goToMap} style={style.pressable}>
            <Text style={style.button}>
              Return to Campus - Explore More Subjects
            </Text>
          </Pressable>
        </View>
        <Text style={style.certifyText}>
          Certified by: The My Student Years Exam Board
        </Text>
      </View>
    </ImageBackground>
  );
}
