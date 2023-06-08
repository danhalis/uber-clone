import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";

import { selectOrigin } from "slices/navSlice";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

const Map = () => {
  const platform = Platform.OS;
  const [origin, setOrigin] = useState<any>(useSelector(selectOrigin));

  useEffect(() => {
    (async () => {
      if (origin) return;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        location: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    })();
  }, []);

  return (
    origin && (
      <MapView
        style={tw`flex-1`}
        mapType={
          platform === "android"
            ? "standard"
            : platform === "ios"
            ? "mutedStandard"
            : undefined
        }
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {(
          <Marker
            identifier="origin"
            title="Origin"
            description={origin.description}
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
          />
        )}
      </MapView>
    )
  );
};

export default Map;
