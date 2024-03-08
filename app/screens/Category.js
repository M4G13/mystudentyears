import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";

import { CompletionContext } from "../Context.js";
import { getNumCorrect, getData } from "../common.js";
import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { category } = getData(route.params);
  const [completion] = useContext(CompletionContext);
  const catCompletion = completion[category.id];

  return (
    <View style={baseStyle.view}>
      <>
        <Text style={baseStyle.bigText}>
          This is the {category.Category} section
        </Text>
        {catCompletion?.quiz && (
          <Text style={baseStyle.bigText}>
            Previously you got {getNumCorrect(catCompletion.quiz)} out of{" "}
            {category.quiz.questions.length}
          </Text>
        )}
        <Pressable
          onPress={() =>
            navigation.navigate("Info", {
              ...route.params,
              index: 0,
            })
          }
        >
          <Text style={baseStyle.button}>Start Reading</Text>
        </Pressable>

        {catCompletion?.info && (
          <Pressable
            onPress={() => {
              navigation.navigate("Question", {
                ...route.params,
                index: 0,
              });
            }}
          >
            <Text style={baseStyle.button}>
              {catCompletion?.quiz ? "Retake Quiz" : "Start Quiz"}
            </Text>
          </Pressable>
        )}
      </>
    </View>
  );
}
