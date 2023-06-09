import { Image, StyleSheet, View } from "react-native";
import TopSafeAreaView from "components/TopSafeAreaView";
import React from "react";
import tw from "tailwind-react-native-classnames";
import ServiceOptionList from "components/ServiceOptionList";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "slices/navSlice";
import FavoriteDestinationList from "components/FavoriteDestinationList";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <TopSafeAreaView style={tw`bg-white h-full`}>
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
          // input styles
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
          minLength={2}
          textInputProps={{
            returnKeyType: "search",
            onChangeText: (value: string) => {
              if (value !== "") return;
              // If the text is empty
              dispatch(setOrigin(null));
              dispatch(setDestination(null));
            },
          }}
          // api / query
          nearbyPlacesAPI="GooglePlacesSearch"
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          fetchDetails
          debounce={400}
          // events
          onPress={(data, details) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
        />
        <ServiceOptionList />
        <FavoriteDestinationList />
      </View>
    </TopSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
