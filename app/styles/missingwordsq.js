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
    color: "#000000",
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
    backgroundColor: "#ff69b4",
    padding: 15,
    borderRadius: 5,
    flexBasis: "40%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    color: "#ffffff",
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
    color: "#000000",
  },
  input: {
    width: 300,
    alignItems: "stretch",
    marginTop: 60,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  draggable: {
    borderWidth: 1,
    backgroundColor: "#779ecb",
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  draggableSelected: {
    backgroundColor: "#ff69b4",
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
