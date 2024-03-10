import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

import baseStyle from "../styles/base.js";

export const PrettyButtonState = ({
  onPress,
  children,
  toggled,
  style,
  ...props
}) => {
  const depth = 3;
  const colorProgress = useSharedValue(0);
  colorProgress.value = withTiming(toggled ? 1 : 0, {
    duration: 100,
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        [baseStyle.colors.fg1, baseStyle.colors.fg4],
      ),
      top: withTiming(toggled ? depth : 0, { duration: 100 }),
    };
  });

  return (
    <View style={style}>
      <View style={{ ...styles.buttonContainer, ...styles.under }} />
      <Animated.View style={[styles.buttonContainer, animatedStyles]}>
        <Pressable
          {...props} // Spread additional props
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.text}>{children}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const PrettyButton = (props) => {
  const [toggled, setToggled] = useState(false);
  return (
    <PrettyButtonState
      {...props}
      onPressIn={() => setToggled(true)}
      onPressOut={() => setToggled(false)}
      onHoverOut={() => setToggled(false)}
      toggled={toggled}
    />
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
    justifyContent: "center",
    height: "100%",
  },
  buttonContainer: {
    height: "100%",
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
