import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import style from "../../styles/missingwordsq.js";

const _ = require("lodash");

export default function MissingWordsQ({ question, handleAnswer }) {
  const correctKeywords = Array.from(
    question.question.matchAll(/\[(.+?)\]/g),
    (w) => w[1],
  );

  const questionString = question.question.split(/\[.+?\]/g);

  const [keywords, setKeywords] = useState({
    selected: new Array(correctKeywords.length).fill(null),
    available: _.shuffle(correctKeywords),
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
        <Text style={style.bigText}>
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
      <View style={style.keywords}>
        {keywords.available.length ? (
          keywords.available.map((keyword, index) => (
            <Pressable
              style={style.draggable}
              onPress={() => {
                putKeyword(index);
              }}
              key={`${index}${keyword}`}
            >
              <Text style={style.bigText}>{keyword}</Text>
            </Pressable>
          ))
        ) : (
          <View style={style.submitButtonContainer}>
            <Pressable
              style={style.submitButton}
              onPress={() =>
                handleAnswer(_.isEqual(keywords.selected, correctKeywords))
              }
            >
              <Text style={style.button}>Submit</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
