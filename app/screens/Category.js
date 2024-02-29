import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image } from "react-native";

import { getData } from "../common.js";
import PrettyButton from "../components/PrettyButton.js";
import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { category } = getData(route.params);

  const [completion, setCompletion] = useState(null);
  const [infoCompletion, setInfoCompletion] = useState(null);
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(global.api_url + "/category-image");
        const data = await response.json();
        setImages(
          data.Pair.reduce((acc, pair) => {
            acc[pair.CategoryName] = pair.Image.url;
            return acc;
          }, {}),
        );
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getCompletion() {
        try {
          const infoCompletion = await AsyncStorage.getItem(
            "info" + category.id,
          );
          setInfoCompletion(infoCompletion);
        } catch (e) {
          console.error("Failed to get info page completion" + e);
          setInfoCompletion(null);
        }

        try {
          let sum = 0;
          const quizCompletion = await AsyncStorage.getItem(
            "quiz" + category.id,
          );
          if (quizCompletion != null) {
            JSON.parse(quizCompletion).map((x) => (sum += x ? 1 : 0));
            setCompletion(sum);
          } else {
            setCompletion(null);
          }
        } catch (e) {
          console.error("Failed to get progress. " + e);
          setCompletion(null);
        }
      }

      getCompletion();
    }, []),
  );

  return (
    <View style={baseStyle.view}>
      <>
        <Text style={baseStyle.bigText}>
          This is the {category.Category} section
        </Text>
        {completion !== null && (
          <Text style={baseStyle.bigText}>
            Previously you got {completion} out of{" "}
            {category.quiz.questions.length}
          </Text>
        )}

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <View style={baseStyle.imageContainer}>
              {images && images[category.Category] && (
                <Image
                  source={{ uri: global.url + images[category.Category] }}
                  style={baseStyle.image}
                  resizeMode="contain"
                />
              )}
            </View>

            <View style={{ width: "80%" }}>
              <PrettyButton
                onPressOut={() =>
                  navigation.navigate("Info", {
                    ...route.params,
                    index: 0,
                  })
                }
              >
                Start Reading
              </PrettyButton>
            </View>

            {infoCompletion !== null && (
              <View style={{ width: "80%" }}>
                <PrettyButton
                  onPressOut={() => {
                    navigation.navigate("Question", {
                      ...route.params,
                      index: 0,
                    });
                  }}
                >
                  {completion ? "Retake Quiz" : "Start Quiz"}
                </PrettyButton>
              </View>
            )}
          </>
        )}
      </>
    </View>
  );
}
