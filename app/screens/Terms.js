import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import baseStyle from "../styles/base";

export default function Terms({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [termsContent, setTermsContent] = useState("");

  const fetchData = () => {
    fetch(global.api_url + "t-and-c")
      .then((response) => response.json())
      .then((data) => {
        setTermsContent(data.data.attributes.TermsAndConditions);
        setIsLoading(false);
        setError(false);
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
      <Text style={baseStyle.smallText}>{termsContent}</Text>
    </View>
  );
}
