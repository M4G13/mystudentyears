import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  questionContainer: {
    padding: 30,
    paddingLeft: 10,
    color: "#000000",
  },

  submitButtonContainer: {
    marginTop: "auto",
    marginBottom: 10,
  },

  submitButton: {
    backgroundColor: "#ff69b4",
    borderRadius: 5,
    padding: 15,
    marginBottom: 0
  },

  listItem: {
    backgroundColor: "#ff69b4",
    borderColor: "#ff69b4",
    borderWidth: 4,
    padding: 15,
    borderRadius: 5,
    margin: 5,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },

  button: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
  },

  bigText: {
    ...base.bigText,
    textAlign: "left",
    fontSize: 30,
  },
});

export default style;
