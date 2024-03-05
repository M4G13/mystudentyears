import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import Swiper from "react-native-swiper";

import style from "../styles/gatehouse.js";

export default function Gatehouse({ navigation }) {
  const students = global.data;
  const [studentIndex, setStudentIndex] = useState(0);
  const bgIndex = useSharedValue(0);
  const [pStudentIndex, setPStudentIndex] = useState(0);

  const bgColorAnim = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bgIndex.value,
        [0, 1],
        [
          style.cardColors[pStudentIndex],
          style.cardColors[studentIndex],
          style.cardColors[1],
        ], // In case nothing is set, this stops a crash.
      ),
    };
  });

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

      AsyncStorage.getItem("currentStudent")
        .then((id) => {
          if (id !== null) setStudentIndex(students.findIndex((s)=>s.id==Number(id)));
        })
        .catch((e) => console.error("Failed to get current student" + e));

      getCompletion();
    }, []),
  );

  return (
    <View style={style.view}>
      <Swiper
        loop={false}
        index={studentIndex}
        onIndexChanged={(i) => {
          setPStudentIndex(studentIndex);
          setStudentIndex(i);
          bgIndex.value = 0; // Need to lerp from 0-1 every time
          bgIndex.value = withTiming(1, { duration: 300 });
        }}
      >
        {students.map((s, i) => (
          <Animated.View
            key={"student" + i}
            style={[style.studentWrapper, bgColorAnim]}
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
                  navigation.navigate("Campus", { student_id: s.id });
                  AsyncStorage.setItem("currentStudent", s.id.toString());
                }}
              >
                <Text style={style.button}>Go to Campus</Text>
              </Pressable>
            </View>
          </Animated.View>
        ))}
      </Swiper>
    </View>
  );
}
