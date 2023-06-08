import { StyleSheet, StatusBar, Platform } from "react-native";
export default StyleSheet.create({
  androidTopSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
