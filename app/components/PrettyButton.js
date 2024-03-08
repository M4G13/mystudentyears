import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

import baseStyle from "../styles/base.js";

const PrettyButton = ({ onPress, children, ...otherProps }) => {
  const top = useSharedValue(0);
  const colorProgress = useSharedValue(0);

  const depth = 3;

  const bgAnim = useAnimatedStyle(() => {
    return otherProps.toggle
      ? {
          backgroundColor: interpolateColor(
            colorProgress.value,
            [0, 1],
            [baseStyle.colors.fg1, baseStyle.colors.fg4],
          ),
        }
      : {};
  });

  const pressIn = () => {
    if (otherProps.toggle) {
      colorProgress.value = withTiming(top.value > 0 ? 0 : 1, {
        duration: 100,
      });
      top.value = withTiming(top.value > 0 ? 0 : depth, { duration: 100 });
    } else {
      top.value = withTiming(depth, { duration: 100 });
    }
  };

  const pressOut = () => {
    if (!otherProps.toggle) {
      top.value = withTiming(0, { duration: 100 });
      colorProgress.value = withTiming(0, { duration: 100 });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.buttonContainer, ...styles.under }} />
      <Animated.View
        {...otherProps} // Spread additional props
        // Horrible combination of styles but only way to get pretty animations
        style={[styles.buttonContainer, otherProps.style, bgAnim, { top }]}
      >
        <Pressable
          style={styles.button}
          onPressIn={pressIn}
          onPressOut={pressOut}
          onHoverOut={pressOut}
          onPress={() => {
            pressOut();
            onPress();
          }}
        >
          <Text style={styles.text}>{children}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "2%",
  },
  under: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 3,
    backgroundColor: baseStyle.colors.text1,
  },
  button: {
    width: "100%",
    position: "absolute",
    padding: "3%",
  },
  buttonContainer: {
    paddingVertical: "8%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: baseStyle.colors.fg1,
    borderColor: baseStyle.colors.text1,
  },
  text: {
    ...baseStyle.bigText,
    fontSize: 18,
  },
});

export default PrettyButton;
