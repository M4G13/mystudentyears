import React, { useState } from "react";
import { View, Text, TextInput, Keyboard, Image } from "react-native";

import SubmitButton from "../../components/SubmitButton.js";
import style from "../../styles/openresponseq.js";
import { hasImage } from "../Question.js";

export default function OpenResponseQ({ question, handleAnswer }) {
  const [input, setInput] = useState("");

  function compare(actual, expected) {
    actual = actual.toLowerCase().replace(/\W/g, "");
    expected = expected.toLowerCase().replace(/\W/g, "");
    return actual === expected;
  }

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

      <TextInput
        style={style.input}
        placeholder="Enter your answer here"
        placeholderTextColor={style.input.color}
        onChangeText={(text) => setInput(text)}
        value={input}
      />

      <SubmitButton
        onPressOut={() => {
          Keyboard.dismiss();
          if (input !== "") {
            handleAnswer(compare(input, question.answer));
          }
        }}
      />
    </View>
  );
}
