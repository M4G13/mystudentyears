import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  mainImage: {
    width: 200,
    height: 400,
    objectFit: "contain",
  },

  discreteButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default style;
