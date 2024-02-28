import React from "react";
import { View, StyleSheet } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

const SubmitButton = ({ onPressOut }) => {
  const handlePressOut = (event) => {
    if (event.nativeEvent.locationY < 55) {
      onPressOut(event);
    }
  };

  return (
    <View style={styles.submitButtonContainer}>
      <View style={{ flex: 1 }} />
      <AwesomeButton
        style={styles.submitButton}
        stretch
        backgroundColor="green"
        backgroundDarker="#184717"
        borderColor="#184717"
        borderRadius={15}
        borderWidth={3}
        raiseLevel={5}
        onPressOut={handlePressOut} // Use handlePressOut function
      >
        Submit
      </AwesomeButton>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    margin: "10%",
    width: "80%",
    alignSelf: "flex-end",
  },
});

export default SubmitButton;
