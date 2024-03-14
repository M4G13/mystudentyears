import isEqual from "lodash/isEqual";
import shuffle from "lodash/shuffle";
import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import PrettyButton from "../../components/PrettyButton.js";
import style from "../../styles/rankorderq.js";

export default function RankOrderQ({ question, handleAnswer }) {
  const [options, setOptions] = useState({
    selected: new Array(question.answers.length).fill(null),
    available: shuffle(question.answers),
  });

  const handleSelect = (index) => {
    const selected = [...options.selected];
    const available = [...options.available];
    const next = options.selected.indexOf(null);
    selected[next] = available[index];
    available.splice(index, 1);
    setOptions({ selected, available });
  };
  const handleDeselect = (index) => {
    if (options.selected[index] !== null) {
      const selected = [...options.selected];
      selected[index] = null;
      const available = [...options.available, options.selected[index]];
      setOptions({ selected, available });
    }
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
      <View style={style.selected}>
        {options.selected.map((q, i) =>
          q ? (
            <PrettyButton
              key={i}
              onPress={() => handleDeselect(i)}
              style={style.selectedButton}
            >
              {i + 1}: {q.answer}
            </PrettyButton>
          ) : (
            <PrettyButton key={i} style={style.selectedButton}>
              {i + 1}
            </PrettyButton>
          ),
        )}
      </View>
      {options.available.length ? (
        <View style={style.options}>
          {options.available.map((q, i) => (
            <PrettyButton
              key={q.id}
              onPress={() => handleSelect(i)}
              style={style.button}
            >
              {q.answer}
            </PrettyButton>
          ))}
        </View>
      ) : (
        <PrettyButton
          style={style.submitButton}
          onPress={() => {
            handleAnswer(isEqual(options.selected, question.answers));
          }}
        >
          Submit
        </PrettyButton>
      )}
    </View>
  );
}
