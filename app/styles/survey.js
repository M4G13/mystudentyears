import { StyleSheet } from "react-native";

import base from "./base";

const style = StyleSheet.create({
  ...base,
  scrollView: {
    flexGrow: 1,
  },
  view: {
    ...base.view,
    padding: "2%",
    width: "100%",
    height: "100%",
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
    flexWrap: "wrap",
  },
  questionContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  likertContainer: {
    margin: 15,
    flexDirection: "column",
    alignItems: "left",
    width: "100%",
  },
  prettyButton: {
    ...base.prettyButton,
    width: "100%",
  },
  button: {
    color: base.colors.text1,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    width: 380,
    borderWidth: 1,
    borderColor: base.colors.text1,
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: base.colors.text2,
    borderRadius: 10,
    width: "100%"
  },
  option: {
    width: "100%",
    fontSize: 17,
    color: base.colors.text1,
    flexWrap: "wrap",
  },
  questions: {
    marginLeft: 20,
  },
  dropdownOption: {
    fontSize: 20,
    color: base.colors.text1,
    flexWrap: "wrap",
  },
  dropdownInput: {
    fontSize: 20,
    color: base.colors.text1,
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  boxStyle: {
    width: "100%",
    borderColor: base.colors.text1,
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
    width: "100%",
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
