import { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";

import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { id, student_id } = route.params;
  const category = global.data.data
    .find((s) => s.id === student_id)
    .attributes.category.find((c) => c.id === id);
  const infos = category.information.data;
  return (
    <View style={baseStyle.view}>
      <Text style={(styles.bigText, { color: "#ffffff" })}>
        This is the {category.Category} section
      </Text>
      <Text style={(styles.smallText, { color: "#ffffff" })}>
        There will be a bunch of resources here.
      </Text>
      {infos.map((i) => (
        <Pressable
          key={i.id}
          onPress={() =>
            navigation.navigate("Info", {
              id: i.id,
              category_id: id,
              student_id,
            })
          }
        >
          <Text style={styles.quizButton}>{i.attributes.Title}</Text>
        </Pressable>
      ))}
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
});
