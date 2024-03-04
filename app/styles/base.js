import { StyleSheet } from "react-native";

const colors = {
  bg1: "#16161d",
  bg2: "#11111d",
  bg3: "#06060d",
  bg4: "#e0e0e0",
  fg1: "#7bcdf4",
  fg2: "#57e075",
  fg3: "#fef270",
  text1: "#ffffff",
  text2: "#16161d",
  text3: "#FFD700",
  text4: "#6c959e",
  borderColor1: "#ddd",
  translucent1: "#00000033",
  translucent2: "#33333333",
  translucent3: "#33333355",
  translucent4: "#000000dd",
};

const baseStyle = StyleSheet.create({
  colors: { ...colors },
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
    overflow: "hidden",
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
