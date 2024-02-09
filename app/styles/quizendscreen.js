import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  view: {
    ...base.view,
    flex: 1,
    flexDirection: "column",
    justifyItems: "center",
  },
  questionWrapper: {
    alignItems: "center",
    width: "100%",
  },
  bigText: {
    ...base.bigText,
    margin: 20,
  },
  pressable: {
    ...base.pressable,
    width: "90%",
    marginTop: 20,
  },
  buttonContainer: {
    ...base.submitButtonContainer,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default style;
