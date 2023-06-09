import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: require("assets/UberX.webp"),
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: require("assets/UberEats.png"),
    screen: "EatsScreen",
  },
];

const ServiceOptionList = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          onPress={() => {
            navigation.navigate(item.screen);
          }}
        >
          <View>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
              }}
              source={item.image}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`w-10 p-2 mt-4 bg-black rounded-full`}
              name="arrowright"
              type="antdesign"
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ServiceOptionList;
