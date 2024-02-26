import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  view: {
    ...base.view,
    paddingTop: 0,
    marginTop: 0,
    width: "100%",
    height: "100%",
  },
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
    marginLeft: "auto",
    marginRight: "auto",
  },

  bgContainer: {
    top: 0,
    left: 0,
    width: "100%",
  },

  bgImage: {
    width: "100%",
    height: "80%",
    top: 0,
    objectFit: "fill",
  },

  logoContainer: {
    width: "100%",
    height: "50%",
    top: 100,
    position: "absolute",
  },
});

export default style;
