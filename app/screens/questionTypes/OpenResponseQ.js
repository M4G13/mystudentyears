import React, {useState} from 'react';
import { View, Text, Pressable, TextInput } from "react-native";

import style from "../../styles/multichoiceq.js";

export default function OpenResponseQ({ question, handleAnswer }) {

  const [input, setInput] = useState('');

  function compare(actual, expected){
    actual = actual.toLowerCase()
    actual = actual.replace(/\s/g, '')
    actual = actual.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')

    expected = expected.toLowerCase()
    expected = expected.replace(/\s/g, '')
    expected = expected.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')

    return actual == expected
  }

  return (
    <View>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
        
        <View >
          <TextInput
            style={style.input}
            placeholder="Enter your answer here"
            onChangeText={(text) => setInput(text)}
            value={input}
          />
        </View>

      </View>
      <View style={style.optionsContainer}>

      <Pressable style={style.pressable} onPress={() => handleAnswer(compare(input, question.answer))}>
          <Text style={style.button}>Submit</Text>
        </Pressable>

      </View>

        

    </View>
  );
}

