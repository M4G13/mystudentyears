import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  optionsContainer: {
    ...base.optionsContainer,
    flexGrow: 1,
  },
  bigText: {
    ...base.bigText,
    fontSize: 24,
  },
});

export default style;
