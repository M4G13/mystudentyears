import { useState } from "react";
import { View, Text, Image } from "react-native";

import PrettyButton from "../../components/PrettyButton.js";
import style from "../../styles/multichoiceq.js";

export default function MultiChoiceQ({ question, handleAnswer }) {
  const [selected, setSelected] = useState({});

  const handleSelect = (q) => {
    if (
      Object.values(selected).filter(Boolean).length <
        question.options.filter((item) => item.correct === true).length ||
      selected[q.id] === true
    ) {
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

      <View style={style.imageContainer}>
        <Image
          source={
            question.image
              ? {
                  uri: global.url + question.image?.url,
                }
              : require("../../assets/star_filled.png")
          }
          style={style.image}
          resizeMode="contain"
        />
      </View>

      <View style={style.optionsContainer}>
        {question.options.map((q) => (
          <PrettyButton
            key={q.id}
            backgroundColor={selected[q.id] === true ? "#888888" : "#d6d6d6"}
            onPressOut={() => handleSelect(q)}
          >
            {q.text}
          </PrettyButton>
        ))}
      </View>
      <PrettyButton
        width="80%"
        backgroundColor={style.colors.fg2}
        marginLeft="10%"
        onPressOut={() =>
          Object.values(selected).some((value) => value === true) &&
          handleAnswer(isCorrect())
        }
      >
        Submit
      </PrettyButton>
    </View>
  );
}
