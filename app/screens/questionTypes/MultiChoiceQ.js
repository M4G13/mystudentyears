import { View, Text, Pressable } from "react-native";

import style from "../../styles/multichoiceq.js";

export default function MultiChoiceQ({ question, handleAnswer }) {
  return (
    <View>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      <View style={style.optionsContainer}>
        {question.options.map((q) => (
          <Pressable
            key={q.id}
            style={style.pressable}
            onPress={() => handleAnswer(q.correct)}
          >
            <Text style={style.button}>{q.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
