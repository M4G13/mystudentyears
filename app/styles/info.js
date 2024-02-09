import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  view: {
    ...base.view,
    padding: 16,
    minHeight: "100%",
    justifyContent: "flexStart",
  },
});

export default style;
