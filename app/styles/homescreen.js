import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  button: {
    ...base.button,
    margin: 50,
    marginBottom: 100,
  },

  bigText: {
    ...base.bigText,
    marginTop: -30,
  },

  mainImage: {
    width: "95%",
    height: "80%",
    objectFit: "contain",
    marginTop: -50,
    marginBottom: -85,
    zIndex: 3,
    marginLeft: "auto",
    marginRight: "auto",
  },

  bgContainer: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
  },

  bgImage: {
    top: -20,
    left: 0,
    width: "100%",
    height: "80%",
  },

  logoContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default style;
