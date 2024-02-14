import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  ImageBackground,
  Image,
} from "react-native";

import style from "../styles/gatehouse.js";

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

  const [studentIndex, setStudentIndex] = useState(0);
  const currentName = students[studentIndex].Name;
  const currentID = students[studentIndex].id;

  const path = global.url + students[studentIndex].Student_image.url;
  const imageSource = { uri: path };
  const localImage = {
    right: require("../assets/right.png"),
    left: require("../assets/left.png"),
    starFilled: require("../assets/star_filled.png"),
    starEmpty: require("../assets/star_empty.png"),
  };

  const renderStars = (completedCats) => {
    const stars = [];
    const totalStars = 4;
    const filledStars =
      completedCats >= 4
        ? 4
        : completedCats >= 3
          ? 3
          : completedCats > 2
            ? 2
            : completedCats > 1
              ? 1
              : 0;
  };

  return (
    <ImageBackground
      source={imageSource}
      resizeMode="cover"
      style={style.student}
    >
      <View style={style.view}>
        <View style={style.horizontalCenter}>
          <Text style={style.Text}>{currentName}</Text>
        </View>
        <View style={style.Right}>
          <Pressable
            onPress={() => {
              if (studentIndex === students.length - 1) setStudentIndex(0);
              else setStudentIndex((current) => current + 1);
            }}
          >
            <Image source={localImage.right} style={style.Arrow} />
          </Pressable>
        </View>
        <View style={style.Left}>
          <Pressable
            onPress={() => {
              if (studentIndex === 0) setStudentIndex(students.length - 1);
              else setStudentIndex((current) => current - 1);
            }}
          >
            <Image source={localImage.left} style={style.Arrow} />
          </Pressable>
        </View>
        <View style={style.centered}>
          <Pressable
            onPress={() => {
              if (openStories[currentID])
                navigation.navigate("Categories", { student_id: currentID });
              else
                Alert.alert(
                  "Complete " +
                    students[studentIndex - 1].Name +
                    "'s story first!",
                );
            }}
          >
            <Text style={style.pressable}>
              {currentName}'{currentName !== "James" && "s"} Story
              {!openStories[currentID] && " is locked 🔒"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
