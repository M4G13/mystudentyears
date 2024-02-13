import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  view: {
    flex: 1,
  },
  student: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  pressable: {
    position: "absolute",
    fontWeight: "600",
    width: "35%",
  },
  Text: {
    color: "white",
    fontWeight: "600",
    fontSize: 80,
    textAlign: "center",
  },
  Right: {
    color: "white",
    fontWeight: "600",
    fontSize: 40,
    textAlign: "right",
  },  
  Left: {
    color: "white",
    fontWeight: "600",
    fontSize: 40,
    textAlign: "left",
  },
});

export default style;
