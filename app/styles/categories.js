import { StyleSheet } from "react-native";

import baseStyle from "./base";

const style = StyleSheet.create({
  ...baseStyle,
  view: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  completed: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  messageBox: {
    position: "absolute",
    backgroundColor: baseStyle.colors.text1,
    padding: 10,
    paddingTop: 40,
    left: -50,
    borderRadius: 20,
    borderColor: baseStyle.colors.borderColor1,
    minWidth: 150,
  },
  messageBoxTextBig: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  messageBoxButton: {
    backgroundColor: baseStyle.colors.bg4,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  iconSmall: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  starContainer: {
    position: "absolute",
    top: -30,
    flexDirection: "row",
  },
  starCounterContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: baseStyle.colors.b1,
    borderRadius: 5,
    padding: 5,
  },
  starCounterIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  starCounterText: {
    marginLeft: 5,
    color: baseStyle.colors.text1,
  },
  iconSmallMessageBox: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: "contain",
  },
  clearButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  clearButton: {
    ...baseStyle.button,
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  congratsFlag: {
    position: "absolute",
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  flagImage: {
    resizeMode: "contain",
    width: "100%",
    height: 600,
    position: "absolute",
    top: 0,
    left: 0,
  },
  congratsContent: {
    position: "absolute",
    alignItems: "center",
    width: "50%",
  },

  congratsText: {
    ...baseStyle.bigText,
    fontSize: 18,
  },

  congratsTextBig: {
    ...baseStyle.bigText,
    fontSize: 25,
    marginBottom: 20,
  },

  congratsStarCounter: {
    ...baseStyle.bigText,
    fontSize: 18,
    fontWeight: "bold",
    color: baseStyle.colors.text3,
    marginBottom: 10,
    textAlign: "center",
  },

  congratsButton: {
    ...baseStyle.button,
    backgroundColor: baseStyle.colors.bg4,
    marginTop: 20,
  },
  overlayImage: {
    position: "absolute",
    width: 100,
    height: 100,
    resizeMode: "contain",
    top: 20,
  },
  bannerImage: {
    width: "100%",
    resizeMode: "contain",
    height: 100,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default style;
