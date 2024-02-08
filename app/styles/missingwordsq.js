import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    ...base.questionWrapper,
    justifyContent: "space-between",
  },
  draggable: {
    ...base.pressable,
    backgroundColor: base.colors.fg1,
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  draggableSelected: {
    ...base.pressable,
    backgroundColor: base.colors.fg2,
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  keywords: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  wordGaps: {
    ...base.bigText,
    backgroundColor: base.colors.bg3,
    textDecorationLine: "underline",
  },
});

export default style;
