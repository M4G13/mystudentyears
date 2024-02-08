import { StyleSheet } from "react-native";

const colors = {
    bg1: "#151718",
    bg2: "#111316",
    bg3: "#050710",
    fg1: "#05b4ff",
    fg2: "#ff69b4",
    text1: "#ffffff",
    text2: "#000000",
}

const baseStyle = StyleSheet.create({
  colors: {...colors},
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.bg1,
    borderTopWidth: 3,
    borderTop: "solid",
    borderColor: colors.bg2,
    height: "100%",
  },

  button: {
    backgroundColor: colors.fg1,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    minWidth: "45%",
    textAlign: "center",
    fontWeight: "600",
  },

  bigText: {
    color: colors.text1,
    fontWeight: "600",
    fontSize: 25,
    textAlign: "center",
  },

  smallText: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    color: colors.text1,
  },

  discreteButton: {
    textAlign: "bottom",
    position: "absolute",
    bottom: 0,
    left: 0,
  },

  header: {
    backgroundColor: colors.bg1,
  },
});

export default baseStyle;
