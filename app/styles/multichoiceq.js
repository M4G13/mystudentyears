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
    borderWidth: 4,
    width: "90%",
    flexGrow: 1,
  },
  pressableSelected: {
    backgroundColor: base.colors.fg2,
  },
  bigText: {
    ...base.bigText,
    fontSize: 24,
  },
});

export default style;
