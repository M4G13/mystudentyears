import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import style from "../../styles/question.js";

const _ = require("lodash");

export default function MissingWordsQ({ question, handleAnswer }) {
  const keywords = Array.from(
    question.question.matchAll(/\[(.+?)\]/g),
    (w) => w[1],
  );

  const questionString = question.question.split(/\[.+?\]/g);

  const [selected, setSelected] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [availableKeywords, setAvailableKeywords] = useState(
    _.shuffle(keywords),
  );

  function modifyKeyword(index) {
    const nextSelectedKeywords = [...selectedKeywords];
    const nextAvailableKeywords = [...availableKeywords];

    if (selected !== null) {
      nextSelectedKeywords[index] = nextAvailableKeywords[selected];
      nextAvailableKeywords.splice(selected, 1);
      setSelected(null);
    } else if (selectedKeywords[index]) {
      nextAvailableKeywords.push(nextSelectedKeywords[index]);
      delete nextSelectedKeywords[index];
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
                  {selectedKeywords[i] || "____"}
                </Text>
              )}
            </Text>
          );
        })}
      </Text>
      <View style={style.keywords}>
        {availableKeywords.map((keyword, index) => (
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
        ))}
      </View>

      <View style={style.optionsContainer}>
        <Pressable
          style={style.pressable}
          onPress={() => handleAnswer(_.isEqual(selectedKeywords, keywords))}
        >
          <Text style={style.button}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
