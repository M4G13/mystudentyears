import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  Animated,
} from "react-native";

import { getData } from "../common.js";
import style from "../styles/categories.js";

const categoryIcons = {
  Finance: require("../assets/finance.png"),
  Wellbeing: require("../assets/wellbeing.png"),
  Academics: require("../assets/academics.png"),
  Independence: require("../assets/independence.png"),
  StarFilled: require("../assets/star_filled.png"),
  StarEmpty: require("../assets/star_empty.png"),
  Banner: require("../assets/banner.png"),
  flagImage: require("../assets/congratsFlag.png"),
};

const imageSource = require("../assets/temp_map.png");

const categoryStars = 3;

const renderStars = (score) =>
  Array.from({ length: categoryStars }, (_, i) => (
    <Image
      key={`star_${i}`}
      source={
        i < Math.ceil(score * (categoryStars / 100))
          ? categoryIcons.StarFilled
          : categoryIcons.StarEmpty
      }
      style={style.iconSmall}
    />
  ));

const earnedStars = (completed) =>
  Object.values(completed)
    .map((e) => Math.ceil(e.score * (categoryStars / 100)))
    .reduce((a, v) => 1 * a + v, []);

export default function Categories({ route, navigation }) {
  const categories = getData(route.params).student.category;
  const locs = {
    Finance: [60, 125],
    Wellbeing: [120, 500],
    Academics: [180, 235],
    Independence: [260, 110],
  };
  const [completed, setCompleted] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const totalPossibleStars = categories.length * categoryStars;

  const totalEarnedStars = earnedStars(completed);

  const congratsAnimation = useRef(new Animated.Value(-600)).current;
  const animateCongratsFlag = () => {
    Animated.timing(congratsAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animateCongratsFlagOffScreen = () => {
    Animated.timing(congratsAnimation, {
      toValue: -600,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setShowCongrats(false));
  };

  useFocusEffect(
    useCallback(() => {
      const fetchCompletionStatus = async () => {
        const complete = {};
        let allCompleted = true;
        for (const category of categories) {
          try {
            const completion = await AsyncStorage.getItem("quiz" + category.id);
            const score = await AsyncStorage.getItem("quizScore" + category.id);
            complete[category.id] = { completed: completion || false, score };
            if (completion === null) {
              console.log(completion);
              allCompleted = false;
            }
          } catch (e) {
            console.error("Failed to get progress: ", e);
            allCompleted = false;
          }
        }
        setCompleted(complete);
        if (allCompleted) {
          setShowCongrats(true);
          animateCongratsFlag();
        } else {
          setShowCongrats(false);
          congratsAnimation.setValue(-600);
        }
      };
      fetchCompletionStatus();
    }, [categories]),
  );

  return (
    <View style={style.view}>
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={style.view}
      >
        {categories.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => {
              setSelectedCategory(c);
              console.log(completed);
            }}
            style={{
              ...style.iconContainer,
              left: locs[c.Category][0],
              top: locs[c.Category][1],
              zIndex: c === selectedCategory ? 2 : 1,
            }}
          >
            {c === selectedCategory && (
              <View style={style.messageBox}>
                <View>
                  <Text style={style.messageBoxTextBig}>
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
              </View>
            )}
            <Image source={categoryIcons[c.Category]} style={style.icon} />
            {completed[c.id] && completed[c.id].completed ? (
              <View style={style.starContainer}>
                {renderStars(completed[c.id].score)}
              </View>
            ) : null}
          </Pressable>
        ))}

        <View style={style.starCounterContainer}>
          <Image
            source={categoryIcons.StarFilled}
            style={style.starCounterIcon}
          />
          <Text style={style.starCounterText}>
            {totalEarnedStars} / {categories.length * categoryStars}
          </Text>
        </View>

        <Image source={categoryIcons.Banner} style={style.bannerImage} />

        {showCongrats && (
          <Animated.View
            style={[
              style.congratsFlag,
              {
                transform: [{ translateY: congratsAnimation }],
              },
            ]}
          >
            <Image source={categoryIcons.flagImage} style={style.flagImage} />
            <Image
              source={require("../assets/msy-logo.png")}
              style={style.overlayImage}
            />
            <View style={style.congratsContent}>
              <Text style={style.congratsTextBig}>Congratulations!</Text>
              <Text style={style.congratsStarCounter}>
                You got {totalEarnedStars} out of {totalPossibleStars} stars!
              </Text>
              <Text style={style.congratsText}>
                You have completed this student's story.
              </Text>
              <View style={style.congratsButtonContainer}>
                <Pressable onPress={animateCongratsFlagOffScreen}>
                  <Text style={style.congratsButton}>Continue</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Gatehouse")}>
                  <Text style={style.congratsButton}>Return to gatehouse</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        )}

        <Pressable
          onPress={async () => {
            await AsyncStorage.clear();
            setCompleted({});
            setSelectedCategory(null);
          }}
          style={style.clearButtonContainer}
        >
          <Text style={style.clearButton}>Clear data</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}
