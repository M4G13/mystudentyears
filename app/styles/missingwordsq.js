import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    ...base.questionWrapper,
  },
  questionContainer: {
    ...base.questionContainer,
    width: "100%",
    flex: 1,
  },
  contentContainer: {
    ...base.optionsContainer,
    width: "100%",
  },

  option: {
    ...base.option,
    fontSize: 20,
    margin: 5,
  },

  keywords: {
    ...base.optionsContainer,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
  },

  wordGaps: {
    ...base.bigText,
    backgroundColor: base.colors.bg3,
    textDecorationLine: "underline",
    fontSize: 24,
  },

  question: {
    ...base.bigText,
    fontSize: 24,
  },
  button: {
    width: "45%",
    height: "15%",
  },
});

export default style;
