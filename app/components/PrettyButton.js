import React, {useState} from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Animated, { withTiming, useSharedValue } from 'react-native-reanimated';

import baseStyle from "../styles/base.js";

const PrettyButton = ({ onPress, children, ...otherProps }) => {
  const top = useSharedValue(0);

  const depth = 3;


  const pressIn = () => {
    if(otherProps.toggle) {
      top.value = withTiming(top.value>0?0:depth, {duration:100});
    } else {
      top.value = withTiming(depth, {duration:100});
    }
  };

  const pressOut = () => {
    if(!otherProps.toggle) {
      top.value = withTiming(0, {duration: 100});
    }
  };


  return (
    <View style={styles.container}>
      <View style={{...styles.buttonContainer, ...styles.under}}></View>
      <Animated.View
        style={{...styles.buttonContainer, top:top}}
        {...otherProps} // Spread additional props
      >
        <Pressable
          style={styles.button}
          onPressIn={pressIn}
          onPressOut={pressOut}
          onHoverOut={pressOut}
          onPress={()=>{
            pressOut();
            onPress();}}
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
    width:"100%",
    height: "100%",
    top:3,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    position: "absolute",
    padding: "3%",
  },
  buttonContainer: {
    paddingVertical: "6%",
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: baseStyle.colors.fg1,
    borderColor: "white",
    alignItems: "center",
  },
  text: {
    ...baseStyle.bigText,
    fontSize: 14,
  },
});

export default PrettyButton;
