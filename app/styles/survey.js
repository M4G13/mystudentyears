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
    color: base.colors.text1,
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
    backgroundColor: base.colors.fg2,
    padding: 15,
    borderRadius: 5,
    flexBasis: "40%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    color: base.colors.text1,
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
    backgroundColor: base.colors.text1,
    margin: 20,
    borderRadius: 10,
  },
  option: {
    width: "100%",
    fontSize: 17,
    color: base.colors.text1,
    flexWrap: "wrap", // Allow line wrapping
  },
  questions: {
    marginLeft: 20,
  },
  dropdownOption: {
    width: "380",
    maxWidth: "380",
    fontSize: 20,
    color: base.colors.text1,
    flexWrap: "wrap", // Allow line wrapping
  },
  boxStyle: {
    width: 380,
  },
  submit: {
    margin: 20,
    padding: 20,
    width: 380,
    backgroundColor: base.colors.fg1,
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
  smallerText: {
    fontSize: 15,
    color: base.colors.text1,
  },
  link: {
    textDecorationLine: "underline",
    color: base.colors.fg1,
  },
});

export default style;
