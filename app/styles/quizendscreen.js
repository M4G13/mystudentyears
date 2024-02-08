import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  view: {
    ...base.view,
    flex: 1,
    flexDirection: "column",
    justifyItems: "center",
  },
  card: {
    borderRadius: 10,
    padding: 30,
    backgroundColor: "#9fafff",
    alignItems: "center",
    display: "flex",
    borderWidth: 4,
    borderColor: "#0a2a4a",
  },
  bigText: {
    ...base.bigText,
    color: "#0a0a0a",
  },
  smallText: {
    ...base.smallText,
    color: "#0a0a0a",
  },
});

export default style;
