import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Pressable, Alert, BackHandler } from "react-native";

import baseStyle from "../styles/base.js";

export default function Gatehouse({ navigation }) {
  const students = global.data;

  const [openStories, setOpenStories] = useState({});
  useFocusEffect(
    useCallback(() => {
      async function getCompletion() {
        const open = {};
        const completed = [];
        for (let i = 0; i < students.length; i++) {
          completed[i] = 0;
          for (const category of students[i].category) {
            try {
              const storedCompletion = await AsyncStorage.getItem(
                "quiz" + category.id,
              );
              if (storedCompletion != null) {
                completed[i] += 1;
              }
            } catch (e) {
              console.error("Failed to get progress. " + e);
            }
          }
          open[students[i].id] =
            i === 0
              ? true
              : completed[i - 1] === students[i - 1].category.length;
        }
        setOpenStories(open);
      }

      getCompletion();
    }, []),
  );

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused() && navigation.canGoBack()) {
        navigation.navigate("Home Screen"); // Replace with "Home" screen
        return true;
      }
      return false;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={baseStyle.view}>
      <Text style={baseStyle.bigText}>Gatehouse</Text>
      {students.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => {
            if (openStories[s.id]) {
              navigation.navigate("Categories", {
                student_id: s.id,
              });
            } else {
              Alert.alert("Not completed previous story");
            }
          }}
        >
          <Text style={baseStyle.button}>
            {s.Name}
            {!openStories[s.id] && " 🔒"}
          </Text>
        </Pressable>
      ))}

      <Pressable onPress={() => navigation.navigate("Survey")}>
        <Text style={baseStyle.button}>Final survey 🔒</Text>
      </Pressable>
    </View>
  );
}
