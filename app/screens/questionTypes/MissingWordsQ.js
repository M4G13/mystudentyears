import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { hasImage } from "../Question.js";
import SubmitButton from "../../components/SubmitButton.js";

import style from "../../styles/missingwordsq.js";
import AwesomeButton from "react-native-really-awesome-button";

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

      <View style={style.imageContainer}>
        <Image
          source={hasImage(question)
            ? { uri: global.url + question.image.url }
            : { uri: global.url + "/uploads/thumbnail_default_2d0864170d.png" }
          }
          style={style.image}
          resizeMode="contain"
        />
      </View>

      <View style={style.keywords}>
  {keywords.available.length ? (
    keywords.available.map((keyword, index) => (
      <View style={style.buttonContainer} >
      <AwesomeButton
        style={style.option}
        backgroundDarker="#666666"
        borderColor="#666666"
        textColor="white"
        backgroundColor="#d6d6d6"
        borderRadius={15}
        borderWidth={2}
        onPressIn={() => {
          putKeyword(index);
        }}
        key={`${index}${keyword}`}
      >
        <Text style={style.bigText}>{keyword}</Text>
      </AwesomeButton>
      </View>
    ))
  ) : (
    <SubmitButton onPressOut={() => handleAnswer(_.isEqual(keywords.selected, correctKeywords))} />
  )}
</View>
    </View>
  );
}
