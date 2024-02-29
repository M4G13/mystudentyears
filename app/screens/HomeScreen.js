import { useEffect, useState } from "react";
import { View, Text, Pressable, Image, StatusBar } from "react-native";

import style from "../styles/homescreen.js";

export default function HomeScreen({ navigation }) {
  StatusBar.setBackgroundColor("#7bcef4");

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchData = () => {
    fetch(global.api_url + "/homepage-image")
      .then((response) => response.json())
      .then((data) => {
        setImage(data.image.url);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={style.view}>
      <View style={style.bgContainer}>
        <Image
          source={require("../assets/HomeScreenBG.png")}
          style={style.bgImage}
        />
      </View>
      <View style={style.logoContainer}>
        <Image source={{ uri: global.url + image }} style={style.mainImage} />
      </View>
      <Text style={style.bigText}>Welcome to My Student Years!</Text>
      {global.uuid ? (
        <Pressable
          onPress={() => {
            StatusBar.setBackgroundColor(style.colors.bg1);
            navigation.navigate("Gatehouse");
          }}
        >
          <Text style={style.button}>Go to Gatehouse</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            StatusBar.setBackgroundColor(style.colors.bg1);
            navigation.navigate("Survey");
          }}
        >
          <Text style={style.button}>Take the Survey</Text>
        </Pressable>
      )}
    </View>
  );
}
