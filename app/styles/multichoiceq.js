import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  questionWrapper: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  questionContainer: {
    padding: 30,
    paddingLeft: 10,
    color: "#000000",
    justifyContent: "space-around",
    width: "100%",
  },
  optionsContainer: {
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 40,
    marginBottom: 40,
  },
  submitButtonContainer: {
    marginTop: "auto",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#ff69b4",
    borderRadius: 5,
    padding: 15,
    margin: 10,
    marginBottom: 0,
  },
  image: {
    width: 100,
    height: 200,
    objectFit: "contain",
  },

  pressable: {
    backgroundColor: "transparent",
    borderColor: "#ff69b4",
    borderWidth: 4,
    padding: 15,
    borderRadius: 5,
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow:1,
  },

  pressableSelected: {
    backgroundColor: "#ff69b4",
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

  bigTextInv: {
    ...base.bigText,
    color: "#000000",
  },
});

export default style;
