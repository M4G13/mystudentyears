import React, { useState } from "react";
import { View, Text, TextInput, Keyboard, Image } from "react-native";

import style from "../../styles/openresponseq.js";
import SubmitButton from "../../components/SubmitButton.js";
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
      source={hasImage(question)
        ? { uri: global.url + question.image.url }
        : { uri: global.url + "/uploads/thumbnail_default_2d0864170d.png" }
      }
      style={style.image} 
      resizeMode="contain"
    />
    </View>

    <View>
    <TextInput
    style={style.input}
    placeholder="Enter your answer here"
    placeholderTextColor={style.input.color}
    onChangeText={(text) => setInput(text)}
    value={input}
    />
    </View>
    
    <View>
    <SubmitButton
    onPressOut={() => {
      Keyboard.dismiss();
      handleAnswer(compare(input, question.answer));
    }}
    />
    </View>

    </View>
  );
}

