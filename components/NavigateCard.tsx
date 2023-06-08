import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination } from "slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`py-5 text-center text-xl`}>Good Morning!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            // input styles
            placeholder="Where To?"
            styles={destinationInputBoxStyle}
            enablePoweredByContainer={false}
            minLength={2}
            textInputProps={{
              returnKeyType: "search",
              onChangeText: (value: string) => {
                if (value !== "") return;
                // If the text is empty
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
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const destinationInputBoxStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
