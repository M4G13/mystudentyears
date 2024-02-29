import React, { useState } from "react";
import { View, Text, TextInput, Keyboard, Image } from "react-native";

import PrettyButton from "../../components/PrettyButton.js";
import style from "../../styles/openresponseq.js";

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

      <TextInput
        style={style.input}
        placeholder="Enter your answer here"
        placeholderTextColor={style.input.color}
        onChangeText={(text) => setInput(text)}
        value={input}
      />

      <PrettyButton
        width="80%"
        marginLeft="10%"
        backgroundColor={style.colors.fg2}
        onPressOut={() => {
          Keyboard.dismiss();
          if (input !== "") {
            handleAnswer(compare(input, question.answer));
          }
        }}
      >
        Submit
      </PrettyButton>
    </View>
  );
}
