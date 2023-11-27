import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import { shuffle } from "../../common.js";
import style from "../../styles/question.js";

export default function MissingWordsQ({ question, handleAnswer }) {
  const keywords = question.question
    .match(/\[([^\]]*)\]/g)
    .map((match) => match.slice(1, -1));
  const [currentQuestion, setCurrentQuestion] = useState(
    question && question.question
      ? question.question.replace(/\[.*?\]/g, (match) =>
          "_".repeat(match.length - 1),
        )
      : "",
  );
  const [prevKeywords, setPrevKeywords] = useState([]);
  const [unusedKeywords, setUnusedKeywords] = useState(keywords);

  const replaceKeyword = (keyword) => {
    const updatedQuestion = currentQuestion.replace(/_+/, keyword);
    setPrevKeywords((prev) => [...prev, keyword]);
    setCurrentQuestion(updatedQuestion);

    setUnusedKeywords((prev) => prev.filter((kw) => kw !== keyword));
  };

  const undo = () => {
    if (prevKeywords.length > 0) {
      const lastUsedKeyword = prevKeywords.pop();
      const updatedQuestion = currentQuestion.replace(
        new RegExp(lastUsedKeyword),
        "_".repeat(lastUsedKeyword.length),
      );
      setCurrentQuestion(updatedQuestion);
      setPrevKeywords([...prevKeywords]);
      setUnusedKeywords((prev) => [...prev, lastUsedKeyword]);
    }
  };

  // Shuffle the unusedKeywords array
  const shuffledKeywords = shuffle(unusedKeywords);

  return (
    <View>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{currentQuestion}</Text>
        <View style={style.keywords}>
          {shuffledKeywords.map((q, index) => (
            <Pressable
              style={style.draggable}
              onPress={() => replaceKeyword(q)}
              key={index}
            >
              <Text style={style.bigText}>{q}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={style.optionsContainer}>
        <Pressable style={style.pressable} onPress={undo}>
          <Text style={style.button}>Undo</Text>
        </Pressable>
        <Pressable
          style={style.pressable}
          onPress={() =>
            handleAnswer(
              currentQuestion === question.question.replace(/\[|\]/g, ""),
            )
          }
        >
          <Text style={style.button}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
