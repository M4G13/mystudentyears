import { StyleSheet } from "react-native";

import baseStyle from "./base";

const style = StyleSheet.create({
  ...baseStyle,
  view: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    zIndex: 2,
    resizeMode: "contain",
  },
  messageBox: {
    position: "absolute",
    backgroundColor: baseStyle.colors.text1,
    padding: 10,
    paddingTop: 50,
    left: -50,
    borderRadius: 15,
    borderColor: baseStyle.colors.borderColor1,
    minWidth: 150,
    zIndex: 1,
  },
  messageBoxText: {
    ...baseStyle.bigText,
    color: baseStyle.colors.text2,
    marginBottom: 10,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
  messageBoxButton: {
    backgroundColor: baseStyle.colors.fg3,
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
    top: -25,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  starProgressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: baseStyle.colors.fg3,
    borderTopWidth: 5,
  },
  starCounterContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: baseStyle.colors.b1,
    borderRadius: 5,
    padding: 5,
    paddingTop: 10,
  },
  starCounterIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  starCounterText: {
    ...baseStyle.bigText,
    marginLeft: 5,
    color: baseStyle.colors.text1,
    fontSize: 25,
  },
  clearButtonContainer: {
    zIndex: 100,
    position: "absolute",
    width: "50%",
    bottom: 0,
    height: 100,
  },
  clearButton: {
    ...baseStyle.button,
    position: "absolute",
    width: 200,
    bottom: 10,
  },
  mapTouchable: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 30,
    textAlign: "center",
  },
  modalImage: {
    objectFit: "contain",
    flex: 1,
  },
  modalButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContant: "center",
    gap: 10,
  },
  modalButton: {
    ...baseStyle.button,
    minWidth: "auto",
    backgroundColor: baseStyle.colors.fg3,
    padding: 15,
    flex: 1,
    justifyItems: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: baseStyle.colors.fg1,
    justifyItems: "center",
    alignItems: "center",
    height: "60%",
    width: "90%",
    padding: 20,
    borderRadius: 15,
    gap: 10,
  },
});

export default style;
