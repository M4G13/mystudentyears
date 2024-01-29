import Constants from "expo-constants"; // REMOVE IN PRODUCTION
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import baseStyle from "../styles/base";

export default function Privacy({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [privacyContent, setPrivacyContent] = useState("");

  const fetchData = () => {
    fetch(
      "http://" +
        Constants.expoConfig.hostUri.split(":").shift() +
        ":1337/api/privacy-policy",
    )
      .then((response) => response.json())
      .then((data) => {
        setPrivacyContent(data.data.attributes.privacyPolicy);
        setIsLoading(false);
        setError(false);
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={baseStyle.view}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={baseStyle.view}>
        <Text style={baseStyle.bigText}>
          Failed to load data, make sure you have an internet connection and try
          again
        </Text>
        <Pressable onPress={fetchData}>
          <Text style={baseStyle.button}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={baseStyle.view}>
      <Text style={baseStyle.smallText}>{privacyContent}</Text>
    </View>
  );
}
