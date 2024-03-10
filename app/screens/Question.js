import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";

import MissingWordsQ from "./questionTypes/MissingWordsQ.js";
import MultiChoiceQ from "./questionTypes/MultiChoiceQ.js";
import OpenResponseQ from "./questionTypes/OpenResponseQ.js";
import RankOrderQ from "./questionTypes/RankOrderQ.js";
import { getData } from "../common.js";
import baseStyle from "../styles/question.js";

export default function Question({ route, navigation }) {
  const [answers, setAnswers] = useState([]);
  const { index } = route.params;
  const { category } = getData(route.params);

  const quiz = category.quiz;

  if (!quiz) {
    alert("No quiz has been made for this category... Come back later!");
    navigation.pop();
    return;
  }

  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === "POP") return;
      e.preventDefault();
      Alert.alert(
        'Exit quiz?',
        'You will lose your current progress. ',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => {
              navigation.dispatch(e.data.action)
            }
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {}
        }
      );
    }), [navigation])

  const question = quiz.questions[index];

  function handleAnswer(correct) {
    const nextAnswers = [...answers, correct];
    setAnswers(nextAnswers);

    if (index < quiz.questions.length - 1) {
      navigation.navigate("Question", {
        ...route.params,
        index: index + 1,
      });
    } else {
      navigation.pop();
      navigation.navigate("QuizEndScreen", {
        ...route.params,
        answers: nextAnswers,
        quiz_id: quiz.id,
      });
    }
  }

  const questionTypes = {
    "questions.multi-choice-question": MultiChoiceQ,
    "questions.open-response-question": OpenResponseQ,
    "questions.rank-order-question": RankOrderQ,
    "questions.missing-words-question": MissingWordsQ,
  };

  const type = question.__component;

  const QuestionType = questionTypes[type];

  return (
    <View style={baseStyle.view}>
      <QuestionType
        question={question}
        handleAnswer={handleAnswer}
        key={question.id}
      />
    </View>
  );
}
