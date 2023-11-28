import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  view: base.view,
  questionContainer: {
    padding: 30,
    marginBottom: 40,
    alignItems: "center",
  },
  optionsContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
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
  bigText: base.bigText,
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
  },
  keywords: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default style;
