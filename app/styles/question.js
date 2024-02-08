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
    color: base.colors.text2,
    justifyContent: "space-around",
  },
  optionsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    gap: 15,
  },
  submitButton: {
    justifyContent: "end",
    marginTop: "auto",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 200,
    objectFit: "contain",
  },
  pressable: {
    backgroundColor: base.colors.fg2,
    padding: 15,
    borderRadius: 5,
    flexBasis: "40%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    color: base.colors.text1,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  bigText: {
    ...base.bigText,
    textAlign: "left",
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
