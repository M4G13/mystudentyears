import React, { useContext } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import Markdown from "react-native-markdown-display";

import { CompletionContext } from "../Context.js";
import { getData } from "../common.js";
import style from "../styles/info.js";

export default function Info({ route, navigation }) {
  const { index } = route.params;

  const [completion, setCompletion] = useContext(CompletionContext);

  const { category } = getData(route.params);

  const information = category.information?.pages || [];
  const isLastPage = index >= information.length - 1;
  const currInfo = information[index];

  const chalkboard = require("../assets/Chalkboard.png");
  const titleRule = require("../assets/rule.png");

  const navigateToNextPage = async () => {
    if (isLastPage) {
      setCompletion({
        ...completion,
        [category.id]: { quiz: completion[category.id]?.quiz, info: true },
      });
      navigation.navigate("Category", {
        ...route.params,
      })
      navigation.navigate("Question", { ...route.params, index: 0 });
    } else {
      navigation.push("Info", { ...route.params, index: index + 1 });
    }
  };

  return (
    <View style={style.view}>
      <ImageBackground
        source={chalkboard}
        resizeMode="cover"
        style={style.bgImage}
      >
        <ScrollView style={style.contentContainer}>
          {currInfo && (
            <>
              <Text style={style.titleText}>{currInfo.Title}</Text>
              <Image source={titleRule} style={style.titleRule} />
              <Markdown style={style.markdownStyle}>{currInfo.Text}</Markdown>
            </>
          )}
          <Pressable onPress={navigateToNextPage}>
            <Text style={style.infoButton}>
              {isLastPage ? "Go to Quiz" : "Continue Reading..."}
            </Text>
          </Pressable>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
