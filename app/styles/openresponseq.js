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
  },


  submitButtonContainer: {
    marginTop: "auto",
  },
  submitButton: {
    backgroundColor: base.colors.fg2,
    borderRadius: 5,
    padding: 15,
    margin: 10,
    marginTop: 30,
  },

  listItem: {
    backgroundColor: base.colors.fg2,
    borderColor: base.colors.fg2,
    borderWidth: 4,
    padding: 15,
    borderRadius: 5,
    margin: 5,
    width: "90%",
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
  },
});

export default style;
