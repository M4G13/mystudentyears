import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  view: [
    base.view,
    {
      padding: 16,
      minHeight: "100%",
      flexGrow: 0,
      justifyContent: "flexStart",
    },
  ],
  button: [base.button, { marginBottom: "auto" }],
  bigText: [base.bigText],
  smallText: base.smallText,
  smallerText: {
    paddingTop: 20,
    color: "#fff",
    fontSize: 15,
    textAlign: "justify",
    flexWrap: "wrap",
  },
});

export default style;
