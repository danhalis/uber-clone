import { SafeAreaView, StyleProp, ViewStyle } from "react-native";
import React from "react";
import GlobalStyles from "styles/global";

interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}
const TopSafeAreaView = ({ style, children }: Props) => {
  return (
    <SafeAreaView style={[GlobalStyles.androidTopSafeArea, style]}>
      {children}
    </SafeAreaView>
  );
};

export default TopSafeAreaView;
