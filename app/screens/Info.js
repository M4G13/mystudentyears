import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Pressable } from "react-native";
import Markdown from "react-native-marked";

import { getData } from "../common.js";
import style from "../styles/info.js";

export default function Info({ route, navigation }) {
  const index = route.params.index;
  const { category } = getData(route.params);

  const information = category.information;
  const currInfo = information[index];
  const isLastPage = index === information.length - 1;

  const navigateToNextPage = async () => {
    if (isLastPage) {
      try {
        await AsyncStorage.setItem("info" + category.id, "complete");
      } catch (e) {
        console.error("Faled to store category completion. " + e);
      }

      try {
        const quizCompletion = await AsyncStorage.getItem("quiz" + category.id);

        if (quizCompletion) {
          await AsyncStorage.removeItem("quiz" + category.id);
        }
      } catch (e) {
        console.error("Failed to clear quiz progress. " + e);
      }

      navigation.navigate("Question", {
        ...route.params,
        index: 0,
      });
    } else {
      navigation.push("Info", {
        ...route.params,
        index: index + 1,
      });
    }
  };

  return (
    <View style={style.view}>
      <Text style={style.bigText}>{currInfo.Title}</Text>
      <Markdown
        value={currInfo.Text}
        flatListProps={{
          style: { backgroundColor: "#151718" },
        }}
      />
      <Pressable onPress={navigateToNextPage}>
        <Text style={style.button}>{isLastPage ? "Go to Quiz" : "Next"}</Text>
      </Pressable>
    </View>
  );
}
