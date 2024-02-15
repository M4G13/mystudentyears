import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  view: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  student: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  horizontalCenter: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  pressable: {
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "#05b4ff",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    minWidth: "45%",
    textAlign: "center",
    fontWeight: "600",
  },
  Text: {
    position: "absolute",
    backgroundColor: base.colors.text2,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    color: base.colors.text4,
    fontWeight: "600",
    fontSize: 80,
    textAlign: "center",
  },
  Arrow: {
    position: "relative",
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  Right: {
    position: "absolute",
    top: 365,
    bottom: 0,
    right: 10,
  },
  Left: {
    position: "absolute",
    top: 365,
    bottom: 0,
    left: 10,
  },
});

export default style;
