import { Text, Pressable, View, ActivityIndicator } from "react-native";
import PrettyButton from "../components/PrettyButton.js";

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
        <PrettyButton 
        style={baseStyle.prettyButton}
        onPress={retry}
        >
          Retry
        </PrettyButton>
      </View>
    );
  }

  return children;
}
