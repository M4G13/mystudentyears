import { useState } from "react";
import { View, Text, Pressable } from "react-native";

import style from "../../styles/multichoiceq.js";

export default function MultiChoiceQ({ question, handleAnswer }) {
  const [selected, setSelected] = useState({});

  const handleSelect = (q) => {
    const nextSelected = { ...selected };
    nextSelected[q.id] = !nextSelected[q.id];
    setSelected(nextSelected);
  };

  const isCorrect = () => {
    let correct = true;
    question.options.forEach((q) => {
      if (q.correct === !selected[q.id]) correct = false;
    });
    return correct;
  };

  return (
    <View style={style.questionWrapper}>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      <View style={style.optionsContainer}>
        {question.options.map((q) => (
          <Pressable
            key={q.id}
            style={
              selected[q.id] === true
                ? { ...style.pressable, ...style.pressableSelected }
                : { ...style.pressable }
            }
            onPress={() => handleSelect(q)}
          >
            <Text style={style.button}>{q.text}</Text>
          </Pressable>
        ))}
      </View>
      <View style={style.submitButtonContainer}>
        <Pressable
          style={style.submitButton}
          onPress={() =>
            // Maybe change this to have an error message if no option selected?
            selected !== [] && handleAnswer(isCorrect())
          }
        >
          <Text style={style.button}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
