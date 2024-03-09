import React, { useContext } from "react";
import { View, Text, Image } from "react-native";

import { CompletionContext } from "../Context.js";
import { getNumCorrect, getData } from "../common.js";
import PrettyButton from "../components/PrettyButton.js";
import baseStyle from "../styles/base.js";

export default function Category({ route, navigation }) {
  const { category } = getData(route.params);

  const [completion] = useContext(CompletionContext);
  const catCompletion = completion[category.id];
  const categoryImages = {
    Finance: require("../assets/Finance.jpg"),
    Wellbeing: require("../assets/Wellbeing.jpg"),
    Academics: require("../assets/Academics.jpg"),
    Independence: require("../assets/Independence.jpg"),
  };

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

        <>
          <View style={baseStyle.imageContainer}>
            <Image
              source={
                category.image
                  ? { uri: global.url + category.image?.url }
                  : categoryImages[category.Category]
              }
              style={baseStyle.image}
              resizeMode="contain"
            />
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
      </>
    </View>
  );
}
