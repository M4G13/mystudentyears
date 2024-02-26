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
    width: "90%",
    marginVertical: 60,
  },

  bigText: {
    ...base.bigText,
    marginBottom: 60,
    fontSize: 24,
  },
});

export default style;
