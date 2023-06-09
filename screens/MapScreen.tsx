import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import Map from "components/Map";
import { createStackNavigator } from "@react-navigation/stack";
import SelectDestinationPanel from "components/SelectDestinationPanel";
import SelectRidePanel from "components/SelectRidePanel";

const MapScreen = () => {
  const Stack = createStackNavigator();

  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="SelectDestinationPanel"
            component={SelectDestinationPanel}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SelectRidePanel"
            component={SelectRidePanel}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
