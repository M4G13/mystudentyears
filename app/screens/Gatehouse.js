import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Swiper from "react-native-swiper";

import style from "../styles/gatehouse.js";

export default function Gatehouse({ navigation }) {
  const students = global.data;
  const [studentIndex, setStudentIndex] = useState(0);

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

  return (
    <View style={style.view}>
      <Swiper
        style={style.wrapper}
        loop={false}
        onIndexChanged={(i) => {
          setStudentIndex(i);
        }}
      >
        {students.map((s, i) => (
          <View
            key={"student" + i}
            style={{
              ...style.studentWrapper,
              backgroundColor: style.cardColors[studentIndex],
            }}
          >
            {!openStories[s.id] && (
              <View style={style.lockedOverlay}>
                <Text style={style.bigText}>
                  This story is locked!{"\n\n"}
                  Complete the previous student's story to unlock it.
                </Text>
              </View>
            )}
            {s.Student_Image !== null && (
              <Image
                source={{ uri: global.url + s.Student_image.url }}
                style={{ ...style.studentImage }}
              />
            )}
            <View style={style.studentCard}>
              <Text style={style.studentText}>{s.Name + "'s"} Story</Text>
              <Pressable
                style={style.pressable}
                onPress={() => {
                  navigation.navigate("Categories", { student_id: s.id });
                }}
              >
                <Text style={style.button}>Go to Campus</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
}
