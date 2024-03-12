import { useState } from "react";
import { View, Text, Image } from "react-native";

import PrettyButton from "../../components/PrettyButton.js";
import style from "../../styles/multichoiceq.js";

export default function MultiChoiceQ({ question, handleAnswer }) {
  const [selected, setSelected] = useState({});

  const correctNumber = question.options.filter(
    (item) => item.correct === true,
  ).length;

  const selectedCorrectNumber =
    Object.values(selected).filter((item) => item === true).length ===
    correctNumber;

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
      {question.image && (
        <View style={style.imageContainer}>
          <Image
            source={{ uri: global.url + question.image?.url }}
            style={style.image}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>

      <View style={style.optionsContainer}>
        {question.options.map((q) => (
          <PrettyButton
            key={q.id}
            onPress={() => handleSelect(q)}
            down={selected[q.id]}
            style={{ flex: 1 }}
          >
            {q.text}
          </PrettyButton>
        ))}
      </View>
        <PrettyButton
          style={style.submitButton}
          onPress={() => {
            if (selectedCorrectNumber) handleAnswer(isCorrect());
            else
              alert(
                `Please select the correct number of options. (${correctNumber})`,
              );
          }}
        >
          Submit
        </PrettyButton>
    </View>
  );
}
