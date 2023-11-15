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
        id: infos[0].id,
        category_id: id,
        student_id,
      })
    }
  };



  return (
    <View style={baseStyle.view}>
      <Text style={(styles.bigText, { color: "#ffffff" })}>
        This is the {category.Category} section
      </Text>
      <Pressable onPress={handleInitialPress}>
        <Text style={styles.startReadingButton}>Start Reading </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate("Question", {
            category_id: id,
            student_id,
          })
        }
      >
        <Text style={styles.quizButton}>Go to the quiz for this section</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  quizButton: {
    backgroundColor: "#05b4ff",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    width: "45%",
  },
  startReadingButton: {
    backgroundColor: "#05b4ff",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    marginTop: 10,
  },
});
