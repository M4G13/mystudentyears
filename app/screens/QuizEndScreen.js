import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Image, Animated } from "react-native";

import style from "../styles/quizendscreen.js";

export default function QuizEndScreen({ route, navigation }) {
  //const { category_id, student_id, score, correctAmount, QuestionAmount } =
  const { category_id, student_id, correctAmount, QuestionAmount } =
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
    navigation.navigate("Campus", { student_id });
  };

  let message = "";
  let grade = "C";
  score = 80;
  if (score < 50) {
    message = "If you want to work to improve your grade you can go back to the campus and read the information for this category, otherwise continue with more quizzes.";
  } else if (score >= 75) {
    message = "That's an excellent score, you clearly understood the information! Go back to the campus and try more quizzes to test yourself on those!";
    grade = "A";
  } else {
    message = "Great effort! You can try the quiz again to improve your score and get more stars, otherwise continue to the campus and try more quizzes!";
    grade = "B";
  }

  return (
    <View style={style.view}>
      <View style={style.imageContainer}>
        <Image source={require("../assets/examResult.png")} style={style.image} />
        <View style={style.messageContainer}>
          <Text style={style.messageText}>
            Congratulations!{"\n\n"}You finished this quiz and got the grade of {grade}!{" "}
            {message}
          </Text>

        </View>
        <View style={style.gradeContainer}>
          <Image source={require("../assets/gradeCircle.png")} style={style.gradeImage}/>
          <Text style={style.gradeText}>
            {grade}
          </Text>
        </View>
      </View>
      <View style={style.buttonContainer}>
          <Pressable onPress={retakeQuiz} style={style.pressable}>
            <Text style={style.button}>Retake Quiz</Text>
          </Pressable>
          <Pressable onPress={goToMap} style={style.pressable}>
            <Text style={style.button}>Return to Campus</Text>
          </Pressable>
      </View>
    </View>
  );
}
