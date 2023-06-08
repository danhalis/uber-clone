import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";

import { selectDestination, selectOrigin } from "slices/navSlice";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const platform = Platform.OS;
  const [origin, setOrigin] = useState<any>(useSelector(selectOrigin));
  const destination = useSelector(selectDestination);
  console.log(origin);
  useEffect(() => {
    (async () => {
      if (origin) return;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const {
        city,
        district,
        streetNumber,
        street,
        region,
        subregion,
        country,
        postalCode,
        name,
        isoCountryCode,
        timezone,
      } = (
        await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      )[0];
      setOrigin({
        location: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
        description: `${name} ${streetNumber} ${street} ${district} ${city} ${subregion} ${region} ${country} ${isoCountryCode} ${postalCode} ${timezone}`,
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
        {destination && (
          <MapViewDirections
            strokeWidth={3}
            strokeColor="black"
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
        {
          <Marker
            identifier="origin"
            title="Origin"
            description={origin.description}
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
          />
        }
      </MapView>
    )
  );
};

export default Map;
