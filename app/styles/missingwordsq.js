import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    ...base.questionWrapper,
    //justifyContent: "space-between",
  },
  questionContainer: {
    ...base.questionContainer,
  },
  contentContainer: {
    ...base.optionsContainer,
    width: "100%",
    //marginTop: "auto",
  },

  option: {
    ...base.option,
    fontSize: 20,
    margin: 5,
  },
  keywords: {
    ...base.optionsContainer,
    padding: 10,
    flexGrow: 1,
    flexDirection: "row",
    alignContent: "flex-end",
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
  buttonContainer: {
    width: "45%",
    height: "15%",
    marginHorizontal: "1%"
  },
});

export default style;
