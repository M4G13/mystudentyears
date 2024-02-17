import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  cardColors: ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"],
  studentCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#33333333",
    borderColor: "#33333355",
    margin: 20,
    marginBottom: 50,
    marginTop: 50,
    borderRadius: 20,
  },
  buttonText: {
    backgroundColor: "#00000033",
  },
  studentWrapper: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  studentImage: {
    flex: 2,
    margin: 20,
    objectFit: "contain",
  },
  studentText: {
    ...base.bigText,
  },
  pressable: {
    marginTop: 20,
  },
  lockedOverlay: {
    ...base.view,
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "#000000dd",
    zIndex: 4,
    padding: 30,
  },
  wrapper: {},
  dotStyle: {},
});

export default style;
