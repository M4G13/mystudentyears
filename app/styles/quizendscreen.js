import { StyleSheet } from "react-native";

import base from "./question.js";

const style = StyleSheet.create({
  ...base,
  view: {
    ...base.view,
    flex: 1,
    flexDirection: "column",
    justifyItems: "center",
  },
  questionWrapper: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 30,
    padding: 20,
  },
  studentIDText: {
    color: base.colors.text2,
    fontWeight: "300",
    fontSize: 15,
    textAlign: "left",
    bottom: 97,
    right: 75,
  },
  subjectIDText: {
    color: base.colors.text2,
    fontWeight: "300",
    fontSize: 15,
    textAlign: "left",
    bottom: 75,
    right: 75,
  },
  bigText: {
    color: base.colors.text2,
    fontWeight: "600",
    fontSize: 25,
    textAlign: "left",
    marginBottom: 10,
    bottom: 62,
    right: 65,
  },
  smallText1: {
    color: base.colors.text2,
    fontWeight: "300",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
    bottom: 80,
    right: 3,
  },
  smallText2: {
    color: base.colors.text2,
    fontWeight: "300",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
    bottom: 60,
    right: 25,
  },
  feedback: {
    color: base.colors.text2,
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
    bottom: 70,
    right: 25,
  },
  pressable: {
    backgroundColor: base.colors.bg1,
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    width: "90%",
    marginTop: 18,
  },
  buttonContainer: {
    ...base.submitButtonContainer,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gradeImage: {
    width: 100,
    height: 100,
    bottom: 25,
    top: -150,
    left: 100,
  },
  certifyText: {
    color: base.colors.text2,
    fontWeight: "300",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
    bottom: -12,
  },
});

export default style;
