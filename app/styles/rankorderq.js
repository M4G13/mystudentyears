import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    ...base.questionWrapper,
    // justifyContent: "space-between",
  },

  button: {
    color: base.colors.text1,
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
  },

  bigText: {
    ...base.bigText,
    fontSize: 24,
    margin: 0,
  },

  pressable: {
    ...base.pressable,
    margin: 5,
  },
  selected: {
    ...base.optionsContainer,
    flex: 1,
    gap: 25,
    // height: "40%"
  },
  options: {
    ...base.optionsContainer,
    width: "100%",
    // flexGrow: 1,
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
  },
  button: {
    width: "45%",
    height: "20%",
  },
  selectedButton: {
    height: "15%",
  }
});

export default style;
