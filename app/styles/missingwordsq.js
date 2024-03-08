import { StyleSheet, Dimensions } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    ...base.questionWrapper,
    justifyContent: "space-between",
  },
  questionContainer: {
    ...base.questionContainer,
    justifyContent: "space-between",
    height: "40%",
  },
  contentContainer: {
    marginTop: "auto",
  },

  option: {
    ...base.option,
    fontSize: 20,
    margin: 5,
  },
  keywords: {
    marginTop: "10%",
    height: "10%",
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
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
  bigText: {
    ...base.bigText,
    fontSize: 20,
  },
  buttonContainer: {
    width: "45%",
  },
});

export default style;
