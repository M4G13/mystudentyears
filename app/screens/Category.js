import React, { useContext, useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";

import { CompletionContext } from "../Context.js";
import { getNumCorrect, getData } from "../common.js";
import PrettyButton from "../components/PrettyButton.js";
import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { category } = getData(route.params);

  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [completion] = useContext(CompletionContext);
  const catCompletion = completion[category.id];

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

  return (
    <View style={baseStyle.view}>
      <>
        <Text style={baseStyle.bigText}>
          This is the {category.Category} section
        </Text>
        {catCompletion?.quiz && (
          <Text style={baseStyle.bigText}>
            Previously you got {getNumCorrect(catCompletion.quiz)} out of{" "}
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
                onPress={() =>
                  navigation.navigate("Info", {
                    ...route.params,
                    index: 0,
                  })
                }
              >
                Start Reading
              </PrettyButton>
            </View>

            {catCompletion?.info && (
              <View style={{ width: "80%" }}>
                <PrettyButton
                  onPress={() => {
                    navigation.navigate("Question", {
                      ...route.params,
                      index: 0,
                    });
                  }}
                >
                  {catCompletion?.quiz ? "Retake Quiz" : "Start Quiz"}
                </PrettyButton>
              </View>
            )}
          </>
        )}
      </>
    </View>
  );
}
