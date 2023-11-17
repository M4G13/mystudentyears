import { Alert, View, Text, Pressable, Image } from "react-native";

import style from "../../styles/multichoiceq.js";

export default function MultiChoiceQ({ question, setAnswer }) {
  function answerLogic(isCorrect) {
    setAnswer(isCorrect);
  }

  return (
    <View>
      <View style={style.questionContainer}>
        <Image
          source={require("../../assets/msy-logo.png")}
          style={style.image}
        />
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      <View style={style.optionsContainer}>
        {question.options.map((q) => (
          <Pressable
            key={q.id}
            style={style.pressable}
            onPress={() => answerLogic(q.correct)}
          >
            <Text style={style.button}>{q.text}</Text>
          </Pressable>))}
      </View>
    </View>
  );
}
