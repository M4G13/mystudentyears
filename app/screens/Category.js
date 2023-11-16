import { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";

import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { id, student_id, student_name } = route.params;
  const category = global.data.data
    .find((s) => s.id === student_id)
    .attributes.category.find((c) => c.id === id);
  const infos = category.information.data;

  const handleInitialPress = () => {
    if (infos.length > 0) {
      navigation.navigate("Info", {
        index: 0,
        category_id: id,
        student_id,
      })
    }
  };

  return (
    <View style={baseStyle.view}>
      <Text style={baseStyle.bigText}>
        This is the {category.Category} section
      </Text>
      <Pressable onPress={handleInitialPress}>
        <Text style={baseStyle.button}>Start Reading </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate("Question", {
            category_id: id,
            student_id,
          })
        }
      >
        <Text style={baseStyle.button}>Go to the quiz for this section</Text>
      </Pressable>
    </View>
  );
}
