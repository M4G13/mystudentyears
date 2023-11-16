import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  view: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  pressable: {
    position: "absolute",
    fontWeight: "600",
    width: "35%",
  },
  button: base.button,
});

export default style;
