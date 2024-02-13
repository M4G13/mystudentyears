import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable, Alert, ImageBackground } from "react-native";

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
  let currentName = students[studentIndex].Name;
  let currentID = students[studentIndex].id;
  let path = global.url + students[studentIndex].Student_image.url;

  imageSource={uri:path}
  


  return (
    <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={style.student}
      >
        <View style={style.view}>
      
          <Text style={style.Text}>
            {currentName}
          </Text>
        <Pressable
          onPress={() => {
            if (studentIndex == students.length-1)setStudentIndex(0);
            else setStudentIndex(current => current+1);
          }}
        >

          <Text style={style.Right}>
            {">"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (studentIndex == 0)setStudentIndex(students.length-1);
            else setStudentIndex(current => current - 1);
          }}
        >
          <Text style={style.Left}>
            {"<"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            
            navigation.navigate("Categories", {student_id: currentID})
          }}
        >
          <Text style={style.button}>
            {currentName}{"'s Story"}
          </Text>
        </Pressable>

      </View>
    </ImageBackground>
  );
}
