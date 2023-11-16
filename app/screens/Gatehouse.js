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
