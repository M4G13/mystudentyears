import { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";

import baseStyle from "../styles/base.js";

export default function Gatehouse({ navigation }) {
  const students = global.data.data;
  return (
    <View style={baseStyle.view}>
      <Text style={baseStyle.bigText}>Gatehouse</Text>
      {students.map((s) => (
        <Pressable
          key={s.id}
          onPress={() =>
            navigation.navigate("Categories", { student_id: s.id, s_name: s.attributes.Name})
          }
        >
          <Text style={baseStyle.button}>{s.attributes.Name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainImage: {
    width: 200,
    height: 400,
    objectFit: "contain",
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
