import isEqual from "lodash/isEqual";
import shuffle from "lodash/shuffle";
import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import PrettyButton, {
  PrettyButtonState,
} from "../../components/PrettyButton.js";
import style from "../../styles/rankorderq.js";

export default function RankOrderQ({ question, handleAnswer }) {
  const [options, setOptions] = useState(shuffle(question.answers));
  const [selected, setSelected] = useState(null);

  const handleSelect = (i) => {
    if (selected === null) {
      setSelected(i);
    } else if (i !== selected) {
      const tempOptions = [...options];
      const temp = tempOptions[i];
      tempOptions[i] = tempOptions[selected];
      tempOptions[selected] = temp;
      setOptions(tempOptions);
      setSelected(i);
    } else {
      setSelected(null);
    }
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
        {options.map((q, i) => (
          <PrettyButtonState
            key={q.id}
            onPress={() => handleSelect(i)}
            toggled={selected === i}
          >
            {q.answer}
          </PrettyButtonState>
        ))}
      </View>
      <View style={style.submitButtonContainer}>
        <PrettyButton
          style={style.submitButton}
          onPress={() => {
            handleAnswer(isEqual(options, question.answers));
          }}
        >
          Submit
        </PrettyButton>
      </View>
    </View>
  );
}
