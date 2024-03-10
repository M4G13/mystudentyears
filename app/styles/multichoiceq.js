import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  optionsContainer: {
    ...base.optionsContainer,
    flexGrow: 1,
  },
  pressable: {
    ...base.pressable,
    backgroundColor: "transparent",
    borderColor: base.colors.fg2,
    width: "90%",
  },
  bigText: {
    ...base.bigText,
    fontSize: 24,
  },
});

export default style;
