import { Component, useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text, Pressable, Image } from "react-native";

import baseStyle from "../styles/base.js";

export default function Info({ route, navigation }) {
  const { id, category_id, student_id } = route.params;
  const info = global.data.data.find(s => s.id === student_id).attributes.category.find(c => c.id === id).information.data.find(i => i.id === id).attributes;

  return (
    <View style={baseStyle.view}>
      <Text style={baseStyle.bigText}>{info.Title}</Text>
      <Text style={baseStyle.bigText}>{info.Text}</Text>
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
