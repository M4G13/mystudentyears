import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    flex: 1,
    height: "100%",
  },
  questionContainer: {
    padding: 30,
    paddingLeft: 10,
    justifyContent: "space-around",
  },
  optionsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    gaps: 15,
  },
  submitButton: {
    justifyContent: "end",
    marginTop: "auto",
    marginBottom: 10,
  },
  bigText: {
    ...base.bigText,
    textAlign: "left",
    fontSize: 30,
  },
  draggable: {
    ...base.button,
    minWidth: 0,
    margin: 5,
  },
  draggableSelected: {
    ...base.button,
    minWidth: 0,
    margin: 5,
    backgroundColor: base.colors.fg2,
  },
  keywords: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  wordGaps: {
    ...base.bigText,
    fontSize: 30,
    backgroundColor: base.colors.bg3,
    borderRadius: 10,
    textDecorationLine: "underline",
  },
});

export default style;
