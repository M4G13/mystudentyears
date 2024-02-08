import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Keyboard } from "react-native";

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
        <TextInput
          style={style.input}
          placeholder="Enter your answer here"
          placeholderTextColor={style.input.color}
          onChangeText={(text) => setInput(text)}
          value={input}
        />
      </View>

      <View style={style.submitButtonContainer}>
        <Pressable
          style={style.submitButton}
          onPress={() => {
            Keyboard.dismiss(); // Close keyboard when navigate away
            handleAnswer(compare(input, question.answer));
          }}
        >
          <Text style={style.button}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
