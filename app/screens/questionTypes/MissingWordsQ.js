import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";

import PrettyButton from "../../components/PrettyButton.js";
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
        <ScrollView>
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
        </ScrollView>
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

      <ScrollView contentContainerStyle={style.contentContainer}>
        <View style={style.keywords}>
          {keywords.available.length ? (
            keywords.available.map((keyword, index) => (
              <View style={style.buttonContainer}>
                <PrettyButton
                  height={50}
                  stretch
                  onPress={() => {
                    putKeyword(index);
                  }}
                  key={`${index}${keyword}`}
                >
                  <Text style={style.bigText}>{keyword}</Text>
                </PrettyButton>
              </View>
            ))
          ) : (
            <PrettyButton
              width="80%"
              backgroundColor={style.colors.fg2}
              marginLeft="10%"
              onPressOut={() =>
                handleAnswer(_.isEqual(keywords.selected, correctKeywords))
              }
            >
              Submit
            </PrettyButton>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
