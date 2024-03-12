import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext } from "react";
import { View, Text, Pressable, ImageBackground, Image } from "react-native";
import Animated, { ZoomIn, ZoomOut, StretchInX } from "react-native-reanimated";

import { CompletionContext } from "../Context.js";
import { getData, getScore } from "../common.js";
import { GradeIcon } from "../components/Grade.js";
import PrettyButton from "../components/PrettyButton.js";
import style from "../styles/campus.js";

const categoryIcons = {
  Finance: require("../assets/finance-icon.png"),
  Wellbeing: require("../assets/wellbeing-icon.png"),
  Academics: require("../assets/academics-icon.png"),
  Independence: require("../assets/independence-icon.png"),
};

const imageSource = require("../assets/temp_map.png");

export default function Campus({ route, navigation }) {
  const categories = getData(route.params).student.category;

  const [completion, setCompletion] = useContext(CompletionContext);

  const numCompleted = categories.filter((c) => completion[c.id]?.quiz).length;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(
    numCompleted === categories.length,
  );

  const locs = {
    Finance: [60, 135],
    Wellbeing: [130, 500],
    Academics: [210, 235],
    Independence: [260, 110],
  };

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
            onPress={() => {
              setSelectedCategory(c);
            }}
            style={{
              ...style.iconContainer,
              left: locs[c.Category][0],
              top: locs[c.Category][1],
            }}
          >
            {c.id === selectedCategory?.id && (
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
                      {completion[selectedCategory.id]?.quiz
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

            {completion[c.id]?.quiz && (
              <GradeIcon
                style={style.grade}
                score={getScore(completion[c.id]?.quiz)}
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
        <PrettyButton
          onPress={async () => {
            await AsyncStorage.clear();
            setCompletion({});
            setSelectedCategory(null);
          }}
          style={style.clearButtonContainer}
        >
          Clear data
        </PrettyButton>
      </ImageBackground>
    </View>
  );
}
