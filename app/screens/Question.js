import React, { useState } from "react";
import { View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  async function handleAnswer(correct) {
    try {
      await AsyncStorage.setItem('quizanswer' + quiz.questions[question_index].id, correct ? "true" : "false")
    } catch (e) {
      console.error('Failed to save answer.' + e)
    }
    if (question_index < quiz.questions.length - 1) {
        navigation.navigate("Question", {
            category_id,
            student_id,
            question_index: question_index + 1,
        });
    } else {
        let value = {};
        try {
            for (i=0;i<quiz.questions.length;i++) {
                value[i] = await AsyncStorage.getItem('quizanswer' + quiz.questions[i].id);
            }
            console.log(value);
        } catch (e) {
            // error reading value
        }
        navigation.popToTop();
        navigation.pop();
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
        handleAnswer={(answer) => handleAnswer(answer)}
      />
    </View>
  );
}
