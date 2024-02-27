import { useState } from "react";
import { View, Text, Pressable, ScrollView, Image } from "react-native";

import SafeButton from "../../components/SafeButton.js";
import SubmitButton from "../../components/SubmitButton.js";
import style from "../../styles/multichoiceq.js";
import { hasImage } from "../Question.js";

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
            hasImage(question)
              ? { uri: global.url + question.image.url }
              : {
                  uri: global.url + "/uploads/thumbnail_default_2d0864170d.png",
                }
          }
          style={style.image}
          resizeMode="contain"
        />
      </View>

      <View style={style.optionsContainer}>
        {question.options.map((q) => (
          <SafeButton
            key={q.id}
            backgroundColor={selected[q.id] === true ? "#888888" : "#d6d6d6"}
            onPressOut={() => handleSelect(q)}
          >
            {q.text}
          </SafeButton>
        ))}
      </View>
      <SubmitButton
        onPressOut={() =>
          Object.values(selected).some((value) => value === true) &&
          handleAnswer(isCorrect())
        }
      />
    </View>
  );
}
