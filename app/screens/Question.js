import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View } from "react-native";

import MissingWordsQ from "./questionTypes/MissingWordsQ.js";
import MultiChoiceQ from "./questionTypes/MultiChoiceQ.js";
import OpenResponseQ from "./questionTypes/OpenResponseQ.js";
import RankOrderQ from "./questionTypes/RankOrderQ.js";
import baseStyle from "../styles/base.js";

export default function Question({ route, navigation }) {
  const { category_id, student_id, question_index } = route.params;
  const quiz = global.data.data
    .find((s) => s.id === student_id)
    .attributes.category.find((c) => c.id === category_id).quiz.data.attributes;

  const [answers, setAnswers] = useState([]);

  async function storeResult(answers) {
    try {
      await AsyncStorage.setItem("quiz" + category_id, JSON.stringify(answers));
    } catch (e) {
      console.error("Failed to save progress. " + e);
    }
  }

  function handleAnswer(correct) {
    const nextAnswers = [...answers, correct];
    setAnswers(nextAnswers);

    if (question_index < quiz.questions.length - 1) {
      navigation.navigate("Question", {
        category_id,
        student_id,
        question_index: question_index + 1,
      });
    } else {
      // probably should navigate to quiz end screen
      storeResult(nextAnswers);
      navigation.popToTop();
    }
  }

  const questionTypes = {
    "questions.multi-choice-question": MultiChoiceQ,
    "questions.open-response-question": OpenResponseQ,
    "questions.rank-order-question": RankOrderQ,
    "questions.missing-words-question": MissingWordsQ,
  };

  const type = quiz.questions[question_index].__component;

  const QuestionType = questionTypes[type];

  return (
    <View style={baseStyle.view}>
      <QuestionType
        question={quiz.questions[question_index]}
        handleAnswer={handleAnswer}
      />
    </View>
  );
}
