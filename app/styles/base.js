import { StyleSheet } from "react-native";

const baseStyle = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#151718",
  },

  button: {
    backgroundColor: "#05b4ff",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    minWidth: "45%",
    textAlign: "center",
    fontWeight: "600",
  },

  bigText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 25,
    textAlign: "center",
  },

  smallText: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    color: "#ffffff",
  },

  discreteButton: {
    textAlign : "bottom",
    position: "absolute",
    bottom: 0,
    left: 0,
  }
});

export default baseStyle;
