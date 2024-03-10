import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: base.colors.bg1,
  },

  submitButtonContainer: {
    padding: 10,
    width: "100%",
    height: "15%",
    marginTop: "auto",
  },

  questionContainer: {
    padding: 30,
  },
  optionsContainer: {
    width: "80%",
    marginBottom: "5%",
    gap: 15
  },
  option: {
    marginBottom: "5%",
  },
  optionSelected: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    backgroundColor: base.colors.fg2,
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
  },
  button: {
    color: base.colors.text1,
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
  },
  bigText: {
    ...base.bigText,
    fontSize: 30,
  },

  bigTextInv: {
    ...base.bigText,
    color: base.colors.text2,
  },
  input: {
    width: 300,
    alignItems: "stretch",
    marginTop: 60,
    borderWidth: 1,
    padding: 10,
    backgroundColor: base.colors.text1,
  },
  draggable: {
    borderWidth: 1,
    backgroundColor: base.colors.fg1,
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  draggableSelected: {
    backgroundColor: base.colors.fg2,
    padding: 10,
    margin: 5,
    marginTop: 0,
  },
  keywords: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default style;
