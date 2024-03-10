import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    ...base.questionWrapper,
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
    flexGrow: 1,
    gap: 15,
  },
  options: {
    ...base.optionsContainer,
    width: "100%",
    flex: 1,
    flexGrow: 1,
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
    flex: 1,
  },
});

export default style;
