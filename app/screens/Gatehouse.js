import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";

import baseStyle from "../styles/base.js";

export default function Gatehouse({ navigation }) {
  const students = global.data.data;

  const [openStories, setOpenStories] = useState({});
  useFocusEffect(
    useCallback(() => {
      async function getCompletion() {
        const open = {};
        const completed = [];
        for (let i = 0; i < students.length; i++) {
          completed[i] = 0;
          for (const category of students[i].attributes.category) {
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
          open[students[i].id] = i === 0 ? true : completed[i - 1] === 4;
        }
        setOpenStories(open);
      }

      getCompletion();
    }, []),
  );

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
              console.warn("Not completed previous story");
            }
          }}
        >
          <Text style={baseStyle.button}>{s.attributes.Name}</Text>
        </Pressable>
      ))}
    </View>
  );
}
