import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import baseStyle from "../styles/base.js";

const PrettyButton = ({ onPress, children, ...otherProps }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        backgroundColor={baseStyle.colors.fg1}
        onPress={onPress}
        {...otherProps} // Spread additional props
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: "2%",
    backgroundColor: baseStyle.fg1,
  },
  button: {
    paddingVertical: "3.5%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
  },
  text: {
    ...baseStyle.bigText,
    fontSize: 14,
  },
});

export default PrettyButton;
