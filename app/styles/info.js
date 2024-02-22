import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  view: {
    ...base.view,
    padding: 16,
    minHeight: "100%",
    justifyContent: "flexStart",
  },
  fullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 35,
    marginBottom: 55,
  },
  infoButton: {
    backgroundColor: base.colors.bg1,
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    minWidth: "45%",
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Chalkduster",
    color: base.colors.text1,
    alignSelf: "center",
    marginTop: 2,
  },
  markdownStylesmall: {
    body: {
      fontFamily: "Chalkduster",
      color: base.colors.text1,
    },
  },
  titleText: {
    color: base.colors.text1,
    fontWeight: "600",
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Chalkduster",
  },
  imageStyle: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
});

export default style;
