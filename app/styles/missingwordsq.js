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
    alignItems: "flex-start",
    height: "35%",
  },
  option: {
    ...base.option,
    fontSize: 20,
    margin: 5,
  },
  keywords: {
    flexDirection: "row",
    alignSelf: "flex-end",
    flexWrap: "wrap",
    width: Dimensions.get("screen").width,
  },
  contentContainer: {},
  wordGaps: {
    ...base.bigText,
    backgroundColor: base.colors.bg3,
    textDecorationLine: "underline",
    textDecorationStyle: "dashed",
    fontSize: 24,
  },
  question: {
    ...base.bigText,
    position: "absolute",
    top: 20, // Position at the top of the parent container
    width: Dimensions.get("screen").width, // Take up full width of the parent container
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
