import { StyleSheet } from "react-native";

import base from "./base";

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  view: {
    ...base.view,
    padding: 16, // Adjust the padding as needed
  },
  bigText: {
    ...base.bigText,
    margin: 10,
  },
  smallText: {
    width: "100%",
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 10,
    flexWrap: "wrap", // Allow line wrapping
  },
  questionContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%", // Ensure full width
  },
  likertContainer: {
    margin: 15,
    flexDirection: "column", // Change to column
    alignItems: "left", // Align items in the center
    width: "100%", // Ensure full width
  },
  pressable: {
    backgroundColor: "#ff69b4",
    padding: 15,
    borderRadius: 5,
    flexBasis: "40%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },

  input: {
    width: 380,
    alignItems: "stretch",
    borderWidth: 1,
    fontSize: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 10,
  },
  option: {
    width: "100%",
    fontSize: 17,
    color: "#ffffff",
    flexWrap: "wrap", // Allow line wrapping
  },
  questions: {
    marginLeft: 20,
  },
  dropdownOption: {
    width: "380",
    fontSize: 20,
    color: "#ffffff",
    flexWrap: "wrap", // Allow line wrapping
  },
  boxStyle: {
    width: 380,
  },
  submit: {
    margin: 20,
    padding: 20,
    width: 380,
    backgroundColor: "#1897F6",
    textAlign: "center",
    borderRadius: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  dropDown: {
    paddingLeft: 20,
  },
  personalInfo: {
    textAlign: "center",
    alignItems: "center",
  },
});

export default style;
