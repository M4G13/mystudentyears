import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import Markdown from "react-native-marked";

import { getData } from "../common.js";
import style from "../styles/info.js";

export default function Info({ route, navigation }) {
  const index = route.params.index;
  const { student, category } = getData(route.params);

  const information = category.information.data;
  const currInfo = information[index].attributes;
  const isLastPage = index === information.length - 1;

  const navigateToNextPage = async () => {
    if (isLastPage) {
      try {
        const storedCompletion = await AsyncStorage.getItem(
          "quiz" + category.id,
        );

        if (storedCompletion) {
          await AsyncStorage.removeItem("quiz" + category.id);
        }
      } catch (error) {
        console.error("Failed to clear quiz progress. " + error);
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

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ title: `${student.Name}, ${category.Category}` });
    }, []),
  );

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
