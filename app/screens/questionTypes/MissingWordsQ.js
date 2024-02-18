import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import style from "../../styles/missingwordsq.js";

const _ = require("lodash");

export default function MissingWordsQ({ question, handleAnswer }) {
  const keywords = Array.from(
    question.question.matchAll(/\[(.+?)\]/g),
    (w) => w[1],
  );

  const questionString = question.question.split(/\[.+?\]/g);

  const [selected, setSelected] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState(
    new Array(keywords.length),
  );
  const [availableKeywords, setAvailableKeywords] = useState(
    _.shuffle(keywords),
  );

  function putKeyword(index) {
    for (const [i, kw] of selectedKeywords.entries()) {
      if(!kw) {
        const nextSelectedKeywords = [...selectedKeywords];
        nextSelectedKeywords[i]=availableKeywords[index];
        setAvailableKeywords(availableKeywords.filter((_, kwi) => kwi!==index));
        setSelectedKeywords(nextSelectedKeywords);
        return;
      }
    }
  }

  function popKeyword(index) {
    if(selectedKeywords[index]) {
      const nextSelectedKeywords = [...selectedKeywords];
      nextSelectedKeywords[index] = null;
      setAvailableKeywords([...availableKeywords, selectedKeywords[index]])
      setSelectedKeywords(nextSelectedKeywords);
    }
  }

  return (
    <View style={style.questionWrapper}>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>
          {questionString.map((text, i) => {
            return (
              <Text key={`${text}${i}${selectedKeywords[i]}`}>
                {text}
                {i < keywords.length && (
                  <Text style={style.wordGaps} onPress={() => popKeyword(i)}>
                    {selectedKeywords[i] || "________"}
                  </Text>
                )}
              </Text>
            );
          })}
        </Text>
      </View>
      <View style={style.keywords}>
        {availableKeywords.length ? (
          availableKeywords.map((keyword, index) => (
            <Pressable
              style={
                selected === index ? style.draggableSelected : style.draggable
              }
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
                handleAnswer(_.isEqual(selectedKeywords, keywords))
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
