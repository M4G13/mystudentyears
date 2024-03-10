import isEqual from "lodash/isEqual";
import shuffle from "lodash/shuffle";
import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import PrettyButton from "../../components/PrettyButton.js";
import style from "../../styles/missingwordsq.js";

export default function MissingWordsQ({ question, handleAnswer }) {
  const correctKeywords = Array.from(
    question.question.matchAll(/\[(.+?)\]/g),
    (w) => w[1],
  );

  const questionString = question.question.split(/\[.+?\]/g);

  const [keywords, setKeywords] = useState({
    selected: new Array(correctKeywords.length).fill(null),
    available: shuffle(correctKeywords),
  });

  function putKeyword(index) {
    const selected = [...keywords.selected];
    const available = [...keywords.available];

    const next = keywords.selected.indexOf(null);
    selected[next] = available[index];
    available.splice(index, 1);
    setKeywords({ selected, available });
  }

  function popKeyword(index) {
    if (keywords.selected[index] !== null) {
      const selected = [...keywords.selected];
      selected[index] = null;
      const available = [...keywords.available, keywords.selected[index]];
      setKeywords({ selected, available });
    }
  }

  return (
    <View style={style.questionWrapper}>
      <View style={style.questionContainer}>
        <Text style={style.question}>
          {questionString.map((text, i) => {
            return (
              <Text key={`${text}${i}${keywords.selected[i]}`}>
                {text}
                {i < correctKeywords.length && (
                  <Text style={style.wordGaps} onPress={() => popKeyword(i)}>
                    {keywords.selected[i] || "________"}
                  </Text>
                )}
              </Text>
            );
          })}
        </Text>
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

      {keywords.available.length ? (
        <View style={style.keywords}>
          {keywords.available.map((keyword, index) => (
            <PrettyButton
              key={`${index}${keyword}`}
              style={{ width: "45%", height: "20%" }}
              onPress={() => {
                putKeyword(index);
              }}
            >
              {keyword}
            </PrettyButton>
          ))}
        </View>
      ) : (
        <View style={style.submitButtonContainer}>
          <PrettyButton
            style={style.submitButton}
            onPress={() =>
              handleAnswer(isEqual(keywords.selected, correctKeywords))
            }
          >
            Submit
          </PrettyButton>
        </View>
      )}
    </View>
  );
}
