import { useState } from "react";
import { View, Text, Image } from "react-native";

import PrettyButton, {
  PrettyButtonState,
} from "../../components/PrettyButton.js";
import style from "../../styles/multichoiceq.js";

export default function MultiChoiceQ({ question, handleAnswer }) {
  const [selected, setSelected] = useState({});

  const selectedCorrectNumber =
    Object.values(selected).filter((item) => item === true).length ===
    question.options.filter((item) => item.correct === true).length;

  const handleSelect = (q) => {
    const nextSelected = { ...selected };
    if (!selectedCorrectNumber || nextSelected[q.id] === true) {
      nextSelected[q.id] = !nextSelected[q.id];
      setSelected(nextSelected);
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
          <PrettyButtonState
            key={q.id}
            onPress={() => handleSelect(q)}
            toggled={selected[q.id]}
          >
            {q.text}
          </PrettyButtonState>
        ))}
      </View>
      <View style={style.submitButtonContainer}>
        <PrettyButton
          style={style.submitButton}
          onPress={() => {
            if (selectedCorrectNumber) handleAnswer(isCorrect());
            else alert("Please select the correct number of options.");
          }}
        >
          Submit
        </PrettyButton>
      </View>
    </View>
  );
}
