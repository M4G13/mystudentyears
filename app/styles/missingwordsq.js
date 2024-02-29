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
    height: Dimensions.get("window").height * 0.3,
  },
  option: {
    ...base.option,
    fontSize: 20,
    margin: 5,
  },
  keywords: {
    marginTop: "10%",
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("screen").width,
  },
  contentContainer: {},
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
    width: Dimensions.get("screen").width * 0.45,
    marginHorizontal: Dimensions.get("screen").width * 0.02,
  },
});

export default style;
