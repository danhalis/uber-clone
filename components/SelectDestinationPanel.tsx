import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-react-native-classnames";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { selectDestination, setDestination } from "slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FavoriteDestinationList from "components/FavoriteDestinationList";

const SelectDestinationPanel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const destination = useSelector(selectDestination);
  const destinationInputRef = useRef<GooglePlacesAutocompleteRef>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    if (destination)
      destinationInputRef.current?.setAddressText(destination.description);
  }, []);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`py-5 text-center text-xl`}>Good Morning!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            ref={destinationInputRef}
            // input styles
            placeholder="Where To?"
            styles={destinationInputBoxStyle}
            enablePoweredByContainer={false}
            minLength={2}
            textInputProps={{
              // value: destination?.description,
              returnKeyType: "search",
              onChangeText: (value: string) => {
                if (loading) return;
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

        <FavoriteDestinationList />
      </View>
    </SafeAreaView>
  );
};

export default SelectDestinationPanel;

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
