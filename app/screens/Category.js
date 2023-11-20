import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";

import Info from "./Info.js";
import Question from "./Question.js";
import baseStyle from "../styles/base.js";

function Entrance({ route, navigation }) {
  const { id, student_id } = route.params;
  const category = global.data.data
    .find((s) => s.id === student_id)
    .attributes.category.find((c) => c.id === id);

  const [completion, setCompletion] = useState(null);

  useEffect(() => {
    async function getCompletion() {
      try {
        const storedCompletion = await AsyncStorage.getItem("quiz" + id);
        setCompletion(storedCompletion);
      } catch (e) {
        console.error("Failed to get progress. " + e);
        setCompletion(null);
      }
    }

    getCompletion();
  }, []);

  return (
    <View style={baseStyle.view}>
      {completion === null ? (
        <>
          <Text style={baseStyle.bigText}>
            This is the {category.Category} section
          </Text>
          <Pressable
            onPress={() =>
              navigation.navigate("Info", {
                index: 0,
                category_id: id,
                student_id,
              })
            }
          >
            <Text style={baseStyle.button}>Start Reading </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("Question", {
                category_id: id,
                student_id,
                question_index: 0,
              })
            }
          >
            <Text style={baseStyle.button}>
              Go to the quiz for this section
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={baseStyle.bigText}>You got {completion}%</Text>
          <Pressable
            onPress={() => {
              AsyncStorage.clear();
              navigation.pop();
            }}
          >
            <Text style={baseStyle.button}>Clear all stored data</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const CatStack = createNativeStackNavigator();

export default function Category() {
  return (
    <CatStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
        presentation: "transparentModal",
      }}
    >
      <CatStack.Screen name="Entrance" component={Entrance} />
      <CatStack.Screen name="Question" component={Question} />
      <CatStack.Screen name="Info" component={Info} />
    </CatStack.Navigator>
  );
}
