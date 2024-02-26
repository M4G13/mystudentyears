import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  justifyContent: "space-between",
  ...base,

  listItem: {
    ...base.pressable,
    margin: 5,
    width: "90%",
    height: 50,
    alignItems: "center",
    alignSelf: "center",
  },

  button: {
    color: base.colors.text1,
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
  },

  bigText: {
    ...base.bigText,
    fontSize: 30,
  },
});

export default style;
