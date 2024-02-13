import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  Dimensions,
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

const renderStars = (score) => {
  const stars = [];
  const totalStars = 3;
  const filledStars = score >= 75 ? 3 : score >= 50 ? 2 : score > 0 ? 1 : 0;

  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <Image
        key={`filled_${i}`}
        source={categoryIcons.StarFilled}
        style={style.iconSmall}
      />,
    );
  }

  for (let i = filledStars; i < totalStars; i++) {
    stars.push(
      <Image
        key={`empty_${i}`}
        source={categoryIcons.StarEmpty}
        style={style.iconSmall}
      />,
    );
  }

  return stars;
};

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
  const imageSource = require("../assets/temp_map.png");
  const [showCongrats, setShowCongrats] = useState(false);
  const congratsAnimation = useRef(new Animated.Value(-600)).current;
  const totalPossibleStars = categories.length * 3;

  const calculateTotalEarnedStars = () => {
    let totalEarnedStars = 0;
    Object.values(completed).forEach((category) => {
      totalEarnedStars +=
        category.score >= 75
          ? 3
          : category.score >= 50
            ? 2
            : category.score > 0
              ? 1
              : 0;
    });
    return totalEarnedStars;
  };

  const totalEarnedStars = calculateTotalEarnedStars();

  const animateCongratsFlag = () => {
    Animated.timing(congratsAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    useCallback(() => {
      const fetchCompletionStatus = async () => {
        const complete = {};
        let allCompleted = true;
        for (const category of categories) {
          try {
            const storedCompletion = await AsyncStorage.getItem(
              "quiz" + category.id,
            );
            const storedScore = await AsyncStorage.getItem(
              "quizScore" + category.id,
            );
            const score = storedScore ? parseInt(storedScore, 10) : null;
            const isCompleted = storedCompletion != null;
            complete[category.id] = { completed: isCompleted, score };
            if (!isCompleted) {
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

  const animateCongratsFlagOffScreen = () => {
    Animated.timing(congratsAnimation, {
      toValue: -600,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setShowCongrats(false));
  };

  const handlePressCategory = (category) => {
    setSelectedCategory(category);
  };

  const adjustedPosition = (category) => {
    const window = Dimensions.get("window");
    const messageBoxWidth = 200;
    const messageBoxHeight = 100;
    let left = locs[category.Category][0];
    let top = locs[category.Category][1] + 20;

    if (left + messageBoxWidth > window.width) {
      left = window.width - messageBoxWidth - 20;
    }
    if (top + messageBoxHeight > window.height) {
      top = window.height - messageBoxHeight - 20;
    }

    if (left < 0) {
      left = 20;
    }
    if (top < 0) {
      top = 20;
    }

    return {
      left,
      top,
      iconLeft: locs[category.Category][0] - left,
      iconTop: locs[category.Category][1] - top,
    };
  };

  return (
    <View style={style.view}>
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={style.map}
      >
        {categories.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => handlePressCategory(c)}
            style={[
              style.pressable,
              {
                left: locs[c.Category][0],
                top: locs[c.Category][1],
              },
            ]}
          >
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
          <Text
            style={style.starCounterText}
          >{`${calculateTotalEarnedStars()} / ${categories.length * 3}`}</Text>
        </View>

          <Image
            source={categoryIcons.Banner}
            style={style.bannerImage}
          />

        {selectedCategory && (
          <View style={[style.messageBox, adjustedPosition(selectedCategory)]}>
            <Image
              source={categoryIcons[selectedCategory.Category]}
              style={{
                position: "absolute",
                width: 50,
                height: 50,
                resizeMode: "contain",
                left: adjustedPosition(selectedCategory).iconLeft,
                top: adjustedPosition(selectedCategory).iconTop,
              }}
            />
            <View style={{ paddingTop: 15 }}>
              <Text style={style.messageBoxTextBig}>
                {selectedCategory.Category} Building
              </Text>
              <Text style={style.messageBoxText}>
                Would you like to go to the {selectedCategory.Category}{" "}
                category?
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
                <Text>Yes</Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedCategory(null)}
                style={style.messageBoxButton}
              >
                <Text>No</Text>
              </Pressable>
            </View>
          </View>
        )}

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
                You have completed this {"\n"} student's story.
              </Text>
              <View style={style.congratsButtonContainer}>
                <Pressable
                  onPress={animateCongratsFlagOffScreen}
                  style={style.congratsButton}
                >
                  <Text>Continue</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("Gatehouse")}
                  style={style.congratsButton}
                >
                  <Text>Go back to gatehouse</Text>
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
          style={style.clearButton}
        >
          <Text style={style.button}>Clear data</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}
