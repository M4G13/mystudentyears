import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    ...base.questionWrapper,
    justifyContent: "space-between",
  },
  questionContainer: {
    ...base.questionContainer,
    height:"30%",
    alignItems: 'flex-start',
  },
  option: {
    ...base.option,
    margin: 5,

  },
  keywords: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    height:"20%",
  },
  wordGaps: {
    ...base.bigText,
    backgroundColor: base.colors.bg3,
    textDecorationLine: "underline",
    textDecorationStyle: "dashed"
  },
  question: {
    ...base.bigText,
    position: 'absolute',
    top: 20, // Position at the top of the parent container
    left:"5%",
    width: '100%', // Take up full width of the parent container
  }
});

export default style;
