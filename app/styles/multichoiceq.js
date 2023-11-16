import { StyleSheet } from "react-native";

import base from "./base.js";

const style = StyleSheet.create({
  view: base.view,
  questionContainer: {
    padding: 30,
    marginBottom: 40,
    alignItems: "center",
  },
  optionsContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row", 
    justifyContent: "center", 
    gap: 15
    
  },
  image: {
    width: 100, 
    height: 200, 
    objectFit: "contain",
  },
  pressable: {
    backgroundColor: "#ff69b4",
    padding: 15,
    borderRadius: 5,
    flexBasis: "40%",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  bigText: base.bigText,
});

export default style;
