import React, { useState } from "react";
import { Alert, View } from "react-native";

import MultiChoiceQ from "./questionTypes/MultiChoiceQ.js";
import baseStyle from "../styles/base.js";

export default function Question({ route, navigation }) {
  function answerLogic(x) {
    if (x) return Alert.alert("Correct");
    return Alert.alert("Incorrect");
  }

  const { category_id, student_id, question_index } = route.params;
  const quiz = global.data.data
    .find((s) => s.id === student_id)
    .attributes.category.find((c) => c.id === category_id).quiz.data.attributes;

  const type = quiz.questions[question_index].__component;

  const [answer, setAnswer] = useState(null);
  if (answer !== null) {
        if (question_index < quiz.questions.length-1) {
            navigation.navigate("Question", {
                category_id: category_id,
                student_id: student_id,
                question_index: question_index + 1,
            })
        }
        else {
            navigation.popToTop()
            navigation.pop()
        }
    setAnswer(null);
  }
  return (
    <View style={baseStyle.view}>
      <MultiChoiceQ
        question={quiz.questions[question_index]}
        setAnswer={setAnswer}
      />
    </View>
  );
}
