import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    flex: 1,
    width: "100%",
  },
  questionContainer: {
    padding: 30,
    paddingLeft: 10,
    width: "100%",
  },
  optionsContainer: {
    width: "100%",
    flexGrow: 1,
    alignItems: "center",
    alignSelf: "center",
    gap: 20,
  },
  submitButtonContainer: {
    marginTop: "auto",
  },
  submitButton: {
    backgroundColor: base.colors.fg2,
    borderRadius: 5,
    padding: 15,
    margin: 10,
    marginTop: 30,
  },
  image: {
    width: 100,
    height: 200,
    objectFit: "contain",
  },
  pressable: {
    backgroundColor: "transparent",
    borderColor: base.colors.fg2,
    borderWidth: 4,
    padding: 15,
    borderRadius: 5,
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
  },
  pressableSelected: {
    backgroundColor: base.colors.fg2,
  },
  button: {
    color: base.colors.text1,
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
  },
  bigText: {
    ...base.bigText,
    textAlign: "left",
    fontSize: 30,
  },
});

export default style;
