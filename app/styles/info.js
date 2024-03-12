import { StyleSheet } from "react-native";
import { styles as mdStyles } from "react-native-markdown-display";

import base from "./base.js";

const style = StyleSheet.create({
  ...base,
  view: {
    ...base.view,
    minHeight: "100%",
    justifyContent: "flexStart",
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    width:"100%",
    height:"100%",
  },
  infoButton: {
    ...base.button,
    padding: 15,
    fontSize: 20,
    margin: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
    color: base.colors.text1,
  },
  markdownStyle: {
    ...Object.keys(mdStyles).reduce((a, k) => {
      a[k] = { ...mdStyles[k] };
      if (a[k].fontSize) {
        a[k].fontSize += 10;
      }
      return a;
    }, {}),
    body: {
      padding: 10,
      fontFamily: "Playpen",
      color: base.colors.text1,
    },
    link: {
      fontFamily: "Playpen",
      color: base.colors.fg1,
    },
  },
  titleText: {
    color: base.colors.text1,
    fontSize: 25,
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Playpen",
  },
  imageStyle: {
    width: "100%",
    marginTop: 10,
    height: 100,
    resizeMode: "contain",
  },
  Pressable:{ 
    width:"80%",
    height:50,
    margin:"10%"
  },

  titleRule: {
    width: "100%",
    resizeMode: "stretch",
    height: 10,
  },
  bgImage: { ...base.view, width: "100%" },
});

export default style;
