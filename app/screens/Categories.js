import { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";

import baseStyle from "../styles/base.js";

export default function Categories({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/temp_map.png")}
        resizeMode="cover"
        style={styles.map}
      >
        <Pressable
          onPress={() => navigation.navigate("Category")}
          style={{ width: "55%", position: "absolute", left: 40, top: 50 }}
        >
          <Text style={styles.selectButton}>Finance</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Categories")}
          style={{ width: "65%", position: "absolute", left: 280, top: 300 }}
        >
          <Text style={styles.selectButton}>Wellbeing</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Categories")}
          style={{ width: "65%", position: "absolute", left: 10, top: 370 }}
        >
          <Text style={styles.selectButton}>Academic Support</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Categories")}
          style={{
            width: "66%",
            height: 70,
            position: "absolute",
            left: 260,
            top: 550,
          }}
        >
          <Text style={styles.selectButton}>4th category(?)</Text>
        </Pressable>
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
  },

  map: {
    flex: 1,
  },
});
