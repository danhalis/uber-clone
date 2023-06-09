import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "slices/navSlice";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Brossard, QC, CA",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, UK",
  },
];
const FavoriteDestinationList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-500`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={async () => {
            const geocodes = await Location.geocodeAsync(destination);
            if (geocodes.length == 0) return;

            dispatch(setOrigin(null));
            dispatch(
              setDestination({
                location: {
                  lat: +geocodes[0].latitude.toFixed(7),
                  lng: +geocodes[0].longitude.toFixed(7),
                },
                description: destination,
              })
            );

            navigation.navigate("MapScreen");
          }}
        >
          <Icon
            name={icon}
            type="ionicon"
            color="white"
            size={18}
            style={tw`mr-4 p-3 bg-gray-300 rounded-full`}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default FavoriteDestinationList;

const styles = StyleSheet.create({});
