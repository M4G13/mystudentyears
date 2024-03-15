import { View, StyleSheet, Pressable, Text } from "react-native";
import Animated, { ZoomIn, ZoomOut, Easing } from "react-native-reanimated";

import baseStyle from "../styles/base.js";

const RadioButton = ({ action, children, selected, text, question }) => {
  return (
    <View style={styles.optionContainer}>
      <Pressable style={styles.button} onPress={action}>
        {selected && (
          <Animated.View
            entering={ZoomIn.duration(400).easing(Easing.elastic(2))}
            exiting={ZoomOut}
            style={styles.buttonBackground}
          />
        )}
      </Pressable>
      <Text style={styles.optionText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBackground: {
    flex: 1,
    margin: 4,
    backgroundColor: baseStyle.colors.fg1,
    borderRadius: 1000,
  },
  optionContainer: {
    flexDirection: "row",
    marginVertical: "0.5%",
    marginLeft: "2%",
  },
  button: {
    borderColor: baseStyle.colors.fg1,
    borderWidth: 3,
    borderRadius: 1000,
    alignSelf: "center",
    width: 30,
    height: 30,
    margin: 15,
    marginVertical: 10,
  },
  optionText: {
    ...baseStyle.bigText,
    fontSize: 18,
    textAlign: "left",
    marginLeft: "1%",
    alignSelf: "center",
  },
});

export default RadioButton;
