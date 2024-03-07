import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useContext } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import Swiper from "react-native-swiper";

import { GradeIcon } from "../components/Grade.js";
import { CurrentStudentContext } from "../context/CurrentStudent.js";
import style from "../styles/gatehouse.js";

export default function Gatehouse({ navigation }) {
  const students = global.data;
  const [currentStudent, setCurrentStudent] = useContext(CurrentStudentContext);
  const [studentIndex, setStudentIndex] = useState({ prev: 0, curr: 0 });
  const bgIndex = useSharedValue(0);

  const bgColorAnim = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bgIndex.value,
        [0, 1],
        [
          style.cardColors[studentIndex.prev || 0],
          style.cardColors[studentIndex.curr],
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
        const gradeTotal = [];
        for (let i = 0; i < students.length; i++) {
          gradeTotal[i] = 0;
          for (const category of students[i].category) {
            try {
              const storedCompletion = await AsyncStorage.getItem(
                "quiz" + category.id,
              );
              if (storedCompletion == null) {
                gradeTotal[i] = null;
                break;
              }
              gradeTotal[i] += JSON.parse(storedCompletion).reduce(
                (j, k) => j + k,
                0,
              );
            } catch (e) {
              console.error("Failed to get progress. " + e);
            }
            if (gradeTotal[i] !== null) {
              gradeTotal[i] /= students[i].category.length;
            }
          }
          open[students[i].id] =
            i === 0
              ? { open: true, gpa: gradeTotal[i] }
              : { open: gradeTotal[i - 1] !== null, gpa: gradeTotal[i] };
        }
        setOpenStories(open);
        console.log(openStories);
      }

      getCompletion();
    }, []),
  );

  return (
    <View style={style.view}>
      <Swiper
        loop={false}
        index={students.findIndex((s) => s.id === Number(currentStudent))}
        onIndexChanged={(i) => {
          setStudentIndex({ prev: studentIndex.curr, curr: i });
          bgIndex.value = 0; // Need to lerp from 0-1 every time
          bgIndex.value = withTiming(1, { duration: 300 });
        }}
      >
        {students.map((s, i) => (
          <Animated.View
            key={"student" + i}
            style={[style.studentWrapper, bgColorAnim]}
          >
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
                  setCurrentStudent(s.id.toString());
                }}
              >
                <Text style={style.button}>Go to Campus</Text>
              </Pressable>
            </View>
            {openStories[s.id] && openStories[s.id].gpa !== null && (
              <GradeIcon score={openStories[s.id].gpa} style={style.gpa} />
            )}

            {!openStories[s.id]?.open && (
              <View style={style.lockedOverlay}>
                <Text style={style.bigText}>
                  This story is locked!{"\n\n"}
                  Complete the previous student's story to unlock it.
                </Text>
              </View>
            )}
          </Animated.View>
        ))}
      </Swiper>
    </View>
  );
}
