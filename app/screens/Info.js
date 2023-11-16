import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import style from "../styles/info.js";

export default function Info({ route, navigation }) {
  const { index, category_id, student_id } = route.params;

  const student = global.data.data.find((s) => s.id === student_id);
  const category = student.attributes.category.find(
    (c) => c.id === category_id,
  );
  const information = category.information.data;

  const isLastPage = index === information.length - 1;

  const navigateToNextPage = () => {
    if (index === information.length - 1) {
      navigation.navigate("Question", {
        category_id,
        student_id,
      });
    } else {
      navigation.push("Info", {
        index: index + 1,
        category_id,
        student_id,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={style.view}>
      <View>
        <Text style={style.smallText}>
          {student.attributes.Name}, {category.Category}
        </Text>
        <Text style={style.bigText}>{information[index].attributes.Title}</Text>
        <Text style={style.smallerText}>
          {information[index].attributes.Text}
        </Text>
        <Pressable onPress={navigateToNextPage}>
          <Text style={style.button}>{isLastPage ? "Go to Quiz" : "Next"}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
