import { Text, Pressable, View, ActivityIndicator } from "react-native";

import baseStyle from "../styles/base.js";

export default function Loading({ isLoading, isError, retry, children }) {
  if (isLoading) {
    return (
      <View style={baseStyle.view}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={baseStyle.view}>
        <Text style={baseStyle.bigText}>
          Failed to load data, make sure you have an internet connection and try
          again
        </Text>
        <Pressable onPress={retry}>
          <Text style={baseStyle.button}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return children;
}
