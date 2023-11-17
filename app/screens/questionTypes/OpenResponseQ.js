import { View, Text, Pressable } from "react-native";

import style from "../../styles/multichoiceq.js";

export default function OpenResponseQ({ question, setAnswer }) {
  function answerLogic(isCorrect) {
    setAnswer(isCorrect);
  }

  return (
    <View>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      <View style={style.optionsContainer}>
        <Pressable style={style.pressable} onPress={() => answerLogic(true)}>
          <Text style={style.button}>next q</Text>
        </Pressable>
      </View>
    </View>
  );
}
