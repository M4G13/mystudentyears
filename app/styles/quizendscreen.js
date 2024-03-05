import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  view: { ...base.view },
  imageContainer: {
    height: "70%",
    width: "100%",
    padding: 10,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    gap: 10,
    width: "100%",
  },
  gradeContainer: {
    position: "absolute",
    padding: 20,
    right: "12%",
    width: 120,
    height: 120,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: "12%",
  },
  messageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
    padding: 30,
  },
  messageText: {
    width: "100%",
    fontFamily: "Playpen",
    fontSize: 18,
    lineHeight: 22,
    padding: 40,
    borderColor: "#000000",
  },
});

export default style;
