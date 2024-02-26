import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  justifyContent: "space-between",
  ...base,

  listItem: {
    ...base.pressable,
    marginTop: 12,
    width: "90%",
    padding: 0,
    height: 45,
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: base.colors.borderColor1,
    borderStyle: "solid",
  },

  button: {
    color: base.colors.text1,
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
  },

  bigText: {
    ...base.bigText,
    fontSize: 24,
    margin: 0,
  },

  pressable: {
    ...base.pressable,
    margin: 5,
  },
});

export default style;
