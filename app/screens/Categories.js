import { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";

import baseStyle from "../styles/base.js";

export default function Categories({ route, navigation }) {
  const { student_id , student_name } = route.params;
  const categories = global.data.data.find((s) => s.id === student_id)
    .attributes.category;
  const locs = {
    Finance: [80, 160],
    Wellbeing: [240, 230],
    Academics: [40, 400],
    Independence: [250, 520],
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/temp_map.png")}
        resizeMode="cover"
        style={styles.map}
      >
        {categories.map((c) => (
          <Pressable
            key={c.id}
            onPress={() =>
              navigation.navigate("Category", {
                id: c.id,
                student_id,
                student_name,
              })
            }
            style={{
              width: "75%",
              position: "absolute",
              left: locs[c.Category][0],
              top: locs[c.Category][1],
            }}
          >
            <Text style={styles.selectButton}>{c.Category}</Text>
          </Pressable>
        ))}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },

  categoryButton: {
    backgroundColor: "#05b4ff",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    width: "45%",
  },

  selectButton: {
    backgroundColor: "#05b4ff",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    width: "45%",
    textAlign: "center",
  },

  map: {
    flex: 1,
  },
});
