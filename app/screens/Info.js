import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import Markdown from "react-native-markdown-display";

import { getData } from "../common.js";
import style from "../styles/info.js";

export default function Info({ route, navigation }) {
  const index = route.params.index;
  const { category } = getData(route.params);

  const information = category.information;
  const isLastPage = index === information.length - 1;
  const [imageUrl, setImageUrl] = useState(null);
  const [currInfo, setCurrInfo] = useState(null);

  const chalkboard = require("../assets/Chalkboard.png");
  const titleRule = require("../assets/rule.png");

  useEffect(() => {
    const infoItem = category.information[index];
    setCurrInfo(infoItem);
    if (infoItem && infoItem.image && infoItem.image.url) {
      const newImageUrl = `${global.url}${infoItem.image.url.startsWith("/") ? "" : "/"}${infoItem.image.url}`;
      setImageUrl(newImageUrl);
    }
  }, [index, category]);

  const navigateToNextPage = async () => {
    if (isLastPage) {
      try {
        await AsyncStorage.setItem("info" + category.id, "complete");
      } catch (e) {
        console.error("Failed to store category completion. " + e);
      }
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
              {imageUrl && (
                <Image source={{ uri: imageUrl }} style={style.imageStyle} />
              )}
              <Markdown style={style.markdownStyle}>{currInfo.Text}</Markdown>
              <Pressable onPress={navigateToNextPage}>
                <Text style={style.infoButton}>
                  {isLastPage ? "Go to Quiz" : "Continue Reading..."}
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
