import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View } from "react-native";

import MissingWordsQ from "./questionTypes/MissingWordsQ.js";
import MultiChoiceQ from "./questionTypes/MultiChoiceQ.js";
import OpenResponseQ from "./questionTypes/OpenResponseQ.js";
import RankOrderQ from "./questionTypes/RankOrderQ.js";
import { getData } from "../common.js";
import baseStyle from "../styles/question.js";

export function calculateScore(answers, totalQuestions) {
  const correctAnswers = answers.filter((answer) => answer === true);
  const score = (correctAnswers.length / totalQuestions) * 100;
  return {
    score,
    correctAmount: correctAnswers.length,
  };
}

export function hasImage(question){
  try{
    question.image.url
    return true
  }catch{
    return false
  }
}

export default function Question({ route, navigation }) {
  const { index } = route.params;
  const { category } = getData(route.params);

  const quiz = category.quiz;

  const question = quiz.questions[index];

  const [answers, setAnswers] = useState([]);

  async function storeResult(answers, score) {
    try {
      await AsyncStorage.setItem("quiz" + category.id, JSON.stringify(answers));
      await AsyncStorage.setItem("quizScore" + category.id, score.toString());
    } catch (e) {
      console.error("Failed to save progress. " + e);
    }
  }

  function handleAnswer(correct) {
    const nextAnswers = [...answers, correct];
    setAnswers(nextAnswers);

    if (index < quiz.questions.length - 1) {
      navigation.navigate("Question", {
        ...route.params,
        index: index + 1,
      });
    } else {
      // probably should navigate to quiz end screen
      const { score, correctAmount } = calculateScore(
        nextAnswers,
        quiz.questions.length,
      );
      storeResult(nextAnswers, score);
      fetch(global.api_url + "/app-user/" + global.uuid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            CompletedQuizzes: [
              {
                quiz: quiz.id,
                results: nextAnswers,
              },
            ],
          },
        }),
      });
      navigation.navigate("QuizEndScreen", {
        ...route.params,
        score,
        correctAmount,
        QuestionAmount: quiz.questions.length,
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (index === 0) {
        setAnswers([]);
        AsyncStorage.removeItem("quiz" + category.id).catch((error) => {
          console.error("Failed to clear progress. " + error);
        });
      }
    }, [index]),
  );

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
      <QuestionType question={question} handleAnswer={handleAnswer} />
    </View>
  );
}
