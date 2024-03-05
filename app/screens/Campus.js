import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, Text, Pressable, ImageBackground, Image } from "react-native";
import Animated, { ZoomIn, ZoomOut, StretchInX } from "react-native-reanimated";

import { getData } from "../common.js";
import { GradeIcon } from "../components/Grade.js";
import style from "../styles/campus.js";

const categoryIcons = {
  Finance: require("../assets/finance.png"),
  Wellbeing: require("../assets/wellbeing.png"),
  Academics: require("../assets/academics.png"),
  Independence: require("../assets/independence.png"),
};

const imageSource = require("../assets/temp_map.png");

export default function Campus({ route, navigation }) {
  const categories = getData(route.params).student.category;
  const locs = {
    Finance: [60, 135],
    Wellbeing: [130, 500],
    Academics: [210, 235],
    Independence: [260, 110],
  };
  const [completed, setCompleted] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [numCompleted, setNumCompleted] = useState(0);

  const fetchCompletionStatus = async () => {
    const complete = {};
    let nComplete = 0;
    for (const category of categories) {
      try {
        const completion = await AsyncStorage.getItem("quiz" + category.id);
        const score = await AsyncStorage.getItem("quizScore" + category.id);
        complete[category.id] = { completed: completion || false, score };
        if (completion !== null) nComplete++;
      } catch (e) {
        console.error("Failed to get progress: ", e);
      }
    }
    setNumCompleted(nComplete);
    setShowModal(nComplete === categories.length);
    setCompleted(complete);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCompletionStatus();
    }, [categories]),
  );

  return (
    <View style={style.view}>
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={style.bgImage}
      >
        <Pressable
          style={{ ...style.mapTouchable, zIndex: showModal ? 9 : 0 }}
          onPress={() => {
            setSelectedCategory(null); // Close the pop-ups on press-out
            setShowModal(false);
          }}
        />
        {categories.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => setSelectedCategory(c)}
            style={{
              ...style.iconContainer,
              left: locs[c.Category][0],
              top: locs[c.Category][1],
            }}
          >
            {c === selectedCategory && (
              <Animated.View
                style={style.messageBox}
                entering={StretchInX.duration(100)}
              >
                <View>
                  <Text style={style.messageBoxText}>
                    {selectedCategory.Category}
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Category", {
                        ...route.params,
                        category_id: selectedCategory.id,
                      });
                      setSelectedCategory(null);
                    }}
                    style={style.messageBoxButton}
                  >
                    <Text>
                      {completed[selectedCategory.id].score !== null
                        ? "Continue"
                        : "Start"}
                    </Text>
                  </Pressable>
                </View>
              </Animated.View>
            )}
            <Image
              source={categoryIcons[c.Category]}
              style={{ ...style.icon, zIndex: 9 }}
            />

            {completed[c.id] && completed[c.id].completed && (
              <GradeIcon
                style={style.grade}
                score={completed[c.id].score}
                pointerEvents="none"
              />
            )}
          </Pressable>
        ))}

        <View style={style.progressBarContainer}>
          <View
            style={{
              ...style.progressBar,
              width: (100 * numCompleted) / categories.length + "%",
            }}
          />
          <Text style={style.progressBarText} adjustFontSizeToFit>
            {numCompleted} of {categories.length} completed!
          </Text>
        </View>

        {showModal && (
          <Animated.View
            style={style.modalContainer}
            exiting={ZoomOut}
            pointerEvents="box-none"
            entering={ZoomIn.duration(500).springify()}
          >
            <View style={style.modal} pointerEvents="auto">
              <Image
                source={require("../assets/category_complete.png")}
                style={style.modalImage}
              />
              <Text style={style.modalText}>
                Congratulations, you finished this story!
              </Text>
              <View style={style.modalButtonContainer}>
                <Pressable
                  style={style.modalButton}
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  <Text>Stay Here</Text>
                </Pressable>
                <Pressable
                  style={style.modalButton}
                  onPress={() => {
                    navigation.navigate("Gatehouse");
                  }}
                >
                  <Text>Go to Gatehouse</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        )}

        {/* TODO: Delete in prod*/}
        <Pressable
          onPress={async () => {
            await AsyncStorage.clear();
            setCompleted({});
            setSelectedCategory(null);
          }}
          style={style.clearButtonContainer}
        >
          <Text style={style.clearButton} adjustsFontSizeToFit>
            Clear data
          </Text>
        </Pressable>
        {/* TODO: Delete in prod*/}
        <Pressable
          onPress={async () => {
            setShowModal(!showModal);
          }}
          style={{ ...style.clearButtonContainer, right: 0 }}
        >
          <Text style={{ ...style.clearButton, right: 0 }} adjustsFontSizeToFit>
            Show Modal
          </Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}
