import { Component, useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text, Pressable, Image } from "react-native";

import baseStyle from "../styles/base.js";

export default function QuizPage({ route, navigation }) {
  
  function answerLogic(x) {
    if (x)
      return Alert.alert("Correct")
    return Alert.alert("Incorrect")
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

    console.log(quiz.questions[0].options[0])
    console.log(quiz.questions[0].options[0].correct)
    


  return (
    <View style={baseStyle.view}>
      <View style={styles.questionContainer}>
        <Image
          source={require("../assets/msy-logo.png")}
          style={{ width: 100, height: 200, objectFit: "contain" }}
        />
        <Text style={styles.questionText}>{quiz.questions[0].question}</Text>
      </View>
      <View>
        {quiz.questions[0].options.map((q)=> (
        <Pressable
          key = {q.id}
          style={[styles.answerButton, { backgroundColor: "#FF69B4" }]}
          onPress={()=>answerLogic(q.correct)}
        >
          <Text style={styles.answerText}>{q.text}</Text>
        </Pressable>))
        
        }
      </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#272522",
  },

  questionContainer: {
    flex: 0,
    width: "100%",
    padding: 30,
    paddingBottom: 50,
    alignItems: "center",
  },

  questionText: {
    textAlign: "center",
    width: "100%",
    fontSize: 30,
    color: "#ffffff",
  },

  buttonRow: {
    margin: 30,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    textTransform: 0,
  },

  answerButton: {
    backgroundColor: "#4488dd",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    width: "45%",
  },

  answerText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },

  selectButton: {
    backgroundColor: "#05b4ff",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    width: "45%",
  },
});
