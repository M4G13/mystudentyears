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
      {question.image && (
        <View style={{ width: "60%", height: "100%", flex: 1 }}>
          <Image
            source={{ uri: global.url + question.image?.url }}
            style={style.image}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>

      <TextInput
        style={style.input}
        placeholder="Enter your answer here"
        placeholderTextColor={style.input.color}
        onChangeText={(text) => setInput(text)}
        value={input}
      />
      <PrettyButton
        style={style.submitButton}
        onPress={() => {
          Keyboard.dismiss();
          if (input !== "") handleAnswer(compare(input, question.answer));
          else alert("Enter an answer to the question.");
        }}
      >
        Submit
      </PrettyButton>
    </View>
  );
}
