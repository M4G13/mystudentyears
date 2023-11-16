import { Alert, View, Text, Pressable, Image } from "react-native";

import style from "../../styles/multichoiceq.js";

export default function QuizPage({ route, navigation }) {
  function answerLogic(x) {
    if (x) return Alert.alert("Correct");
    return Alert.alert("Incorrect");
  }

  const { category_id, student_id } = route.params;
  const quiz = global.data.data
    .find((s) => s.id === student_id)
    .attributes.category.find((c) => c.id === category_id).quiz.data.attributes;

  /*const [currentPage, setCurrentPage] = useState(0);
  //const isFirstPage = currentPage === 0;
  //const isLastPage = currentPage === question.length - 1;


  const navigateToNextPage = () => {
    if (isLastPage) {
      navigation.navigate("QuizEndScreen", {
        category_id,
        student_id,
      });
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToPreviousPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  */

  return (
    <View style={style.view}>
      <View style={style.questionContainer}>
        <Image
          source={require("../../assets/msy-logo.png")}
          style={style.image}
        />
        <Text style={style.bigText}>{quiz.questions[0].question}</Text>
      </View>
      <View style={style.optionsContainer}>
        {quiz.questions[0].options.map((q) => (
          <Pressable
            key={q.id}
            style={style.pressable}
            onPress={() => answerLogic(q.correct)}
          >
            <Text style={style.button}>{q.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
