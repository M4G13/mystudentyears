import React, { useState, useContext } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import Swiper from "react-native-swiper";

import { CurrentStudentContext, CompletionContext } from "../Context.js";
import { getScore } from "../common.js";
import { GradeIcon } from "../components/Grade.js";
import style from "../styles/gatehouse.js";

export default function Gatehouse({ navigation }) {
  const students = global.data;

  const [completion] = useContext(CompletionContext);

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

  const completedStories = students.map((s) =>
    s.category.reduce((open, c) => open && !!completion[c.id]?.quiz, true),
  );

  const gpas = students.map((s) => {
    return (
      s.category.reduce((sum, c) => {
        if (completion[c.id]?.quiz)
          return sum + getScore(completion[c.id].quiz);
        else return 0;
      }, 0) / s.category.length
    );
  });

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

            {(i === 0 ? true : completedStories[i - 1]) ? (
              completedStories[i] && (
                <GradeIcon score={gpas[i]} style={style.gpa} />
              )
            ) : (
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
