import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const styleSheet = StyleSheet.create({
  gradeText: {
    color: "#be1e2d",
    fontFamily: "Playpen",
    transform: [{ rotateX: "-20deg" }, { rotateZ: "10deg" }],
    fontSize: 200,
  },
  gradeImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export function calculateGrade(score) {
  // Number is an upper bound, i.e., A grade from 75 to 100.
  const boundaries = {
    100: "A",
    74: "B",
    59: "C",
    49: "D",
    34: "F",
  };
  return Object.entries(boundaries).find(([k, _]) => score <= k)[1];
}

export function GradeIcon({ style, score }) {
  return (
    <View style={style}>
      <Image
        source={require("../assets/gradeCircle.png")}
        style={styleSheet.gradeImage}
      />
      <Text style={styleSheet.gradeText} adjustsFontSizeToFit>
        {calculateGrade(score)}
      </Text>
    </View>
  );
}
