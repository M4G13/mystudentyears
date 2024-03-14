import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,

  input: {
    backgroundColor: base.colors.bg3,
    color: base.colors.text1,
    padding: 15,
    borderRadius: 5,
    alignSelf: "center",
    width: "80%",
    marginBottom: 15,
  },

  bigText: {
    ...base.bigText,
    fontSize: 24,
  },
});

export default style;
