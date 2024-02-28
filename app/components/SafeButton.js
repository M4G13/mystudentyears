import React from "react";
import { View, StyleSheet } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

const SafeButton = ({ onPressOut, children, ...otherProps }) => {
  const handlePressOut = (event) => {
    if (event.nativeEvent.locationY < 55) {
      onPressOut(event);
    }
  };

  return (
    <View style={styles.container}>
      <AwesomeButton
        style={styles.submitButton}
        stretch
        backgroundDarker="#666666"
        borderColor="#666666"
        textColor="white"
        borderRadius={15}
        borderWidth={2}
        onPressOut={handlePressOut} // Use handlePressOut function
        {...otherProps} // Spread additional props
      >
        {children}
      </AwesomeButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: "2%",
  },
  button: {
    width: "80%",
  },
});

export default SafeButton;
