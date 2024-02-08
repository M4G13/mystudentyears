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

  function modifyKeyword(index) {
    const nextSelectedKeywords = [...selectedKeywords];
    const nextAvailableKeywords = [...availableKeywords];

    if (nextSelectedKeywords[index]) {
      nextAvailableKeywords.push(nextSelectedKeywords[index]);
      delete nextSelectedKeywords[index];
    }
    if (selected !== null) {
      nextSelectedKeywords[index] = availableKeywords[selected];
      nextAvailableKeywords.splice(selected, 1);
      setSelected(null);
    }

    setAvailableKeywords(nextAvailableKeywords);
    setSelectedKeywords(nextSelectedKeywords);
  }

  return (
    <View style={style.view}>
      <Text style={style.bigText}>
        {questionString.map((text, i) => {
          return (
            <Text key={`${text}${i}${selectedKeywords[i]}`}>
              {text}
              {i < keywords.length && (
                <Text
                  style={{ ...style.bigText, backgroundColor: "#ff69b4" }}
                  onPress={() => modifyKeyword(i)}
                >
                  {selectedKeywords[i] || "_______"}
                </Text>
              )}
            </Text>
          );
        })}
      </Text>
      <View style={style.keywords}>
        {availableKeywords.length ? (
          availableKeywords.map((keyword, index) => (
            <Pressable
              style={
                selected === index ? style.draggableSelected : style.draggable
              }
              onPress={() => {
                if (selected === index) setSelected(null);
                else setSelected(index);
              }}
              key={`${index}${keyword}`}
            >
              <Text style={style.bigText}>{keyword}</Text>
            </Pressable>
          ))
        ) : (
          <Pressable
            style={style.pressable}
            onPress={() => handleAnswer(_.isEqual(selectedKeywords, keywords))}
          >
            <Text style={style.button}>Submit</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
