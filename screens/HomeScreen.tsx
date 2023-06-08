import { Image, StyleSheet, Text, View } from "react-native";
import SaferAreaView from "components/SaferAreaView";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";

const HomeScreen = () => {
  return (
    <SaferAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("assets/UberLogo.png")}
        />

        <GooglePlacesAutocomplete
          placeholder="Where From?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          debounce={400}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />
        <NavOptions />
      </View>
    </SaferAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
