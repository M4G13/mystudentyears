import { View, Text, Pressable } from "react-native";

import style from "../../styles/multichoiceq.js";

export default function MissingWordsQ({ question, handleAnswer }) {
  return (
    <View>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      <View style={style.optionsContainer}>
        <Pressable style={style.pressable} onPress={() => handleAnswer(true)}>
          <Text style={style.button}>next q</Text>
        </Pressable>
      </View>
    </View>
  );
}
