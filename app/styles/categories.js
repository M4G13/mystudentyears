import { StyleSheet } from "react-native";
import baseStyle from "./base";

const style = StyleSheet.create({
  view: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  pressable: {
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: baseStyle.colors.borderColor1,
    width: 200,
  },
  messageBoxText: {
    marginBottom: 10,
  },

  messageBoxTextBig: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "600",
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
    backgroundColor: baseStyle.colors.bg1,
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
  clearButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: baseStyle.colors.bg4,
    padding: 5,
    borderRadius: 5,
  },
  congratsFlag: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    top: "20%",
    alignItems: "center",
    width: "100%",
  },

  congratsText: {
    color: baseStyle.colors.text1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 20,
  },

  congratsTextBig: {
    color: baseStyle.colors.text1,
    textAlign: "center",
    fontSize: 29,
    fontWeight: "600",
    marginBottom: 20,
  },

  congratsButton: {
    backgroundColor: baseStyle.colors.text1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  congratsStarCounter: {
    fontSize: 19,
    fontWeight: "bold",
    color: baseStyle.colors.text3,
    marginBottom: 10,
    textAlign: "center",
  },
  overlayImage: {
    position: "absolute",
    width: 100,
    height: 100,
    resizeMode: "contain",
    top: 20,
    backgroundColor: baseStyle.colors.text1,
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
