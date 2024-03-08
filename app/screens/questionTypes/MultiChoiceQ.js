import { useState } from "react";
import { View, Text, Image } from "react-native";

import PrettyButton from "../../components/PrettyButton.js";
import style from "../../styles/multichoiceq.js";

export default function MultiChoiceQ({ question, handleAnswer }) {
  const [selected, setSelected] = useState({});

  const allSelected = (q) =>
    Object.values(selected).filter(Boolean).length <
    question.options.filter((item) => item.correct === true).length;

  const handleSelect = (q) => {
    if (allSelected(q) || selected[q.id] === true) {
      if (selected) {
        const nextSelected = { ...selected };
        nextSelected[q.id] = !nextSelected[q.id];
        setSelected(nextSelected);
      }
    }
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
      {question.image && (
        <View style={style.imageContainer}>
          <Image
            source={{ uri: global.url + question.image?.url }}
            style={style.image}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={style.optionsContainer}>
        {question.options.map((q) => (
          <PrettyButton
            key={q.id}
            onPress={() => handleSelect(q)}
            toggle={allSelected(q)}
          >
            {q.text}
          </PrettyButton>
        ))}
      </View>
      <View style={style.submitButtonContainer}>
        <PrettyButton
          style={style.submitButton}
          onPress={() => {
            Object.values(selected).some((value) => value === true) &&
              handleAnswer(isCorrect());
          }}
        >
          Submit
        </PrettyButton>
      </View>
    </View>
  );
}
