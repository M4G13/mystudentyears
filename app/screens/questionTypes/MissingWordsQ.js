import { Alert, View, Text, Pressable, Image } from "react-native";

import style from "../../styles/multichoiceq.js";

export default function MissingWordsQ({ question, setAnswer }) {
  function answerLogic(isCorrect) {
    setAnswer(isCorrect);
  }

  return (
    <View>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      <View style={style.optionsContainer}>
          <Pressable style={style.pressable}
            onPress={() => answerLogic(true)}
          >
            <Text style={style.button}>next q</Text>
          </Pressable>
      </View>
    </View>
  );
}
