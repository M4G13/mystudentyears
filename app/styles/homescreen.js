import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  mainImage: {
    width: 200,
    height: 400,
    objectFit: "contain",
  },
  view: base.view,
  bigText: base.bigText,
  button: base.button,

  discreteButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
  }
});

export default style;
