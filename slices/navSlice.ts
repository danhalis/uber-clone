import { createSlice } from "@reduxjs/toolkit";
import { Point } from "react-native-google-places-autocomplete";
import { AppState } from "store";

interface NavState {
  origin: { location: { lat: number, lng: number, }; description: string } | null;
  destination: { location: { lat: number, lng: number, }; description: string } | null;
  travelTimeInfo: any;
}

const initialState: NavState = {
  origin: null,
  destination: null,
  travelTimeInfo: null,
};

const navSlice = createSlice({
  name: "nav-slice",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInfo: (state, action) => {
      state.travelTimeInfo = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInfo } =
  navSlice.actions;

export const selectOrigin = (state: AppState) => state.nav.origin;
export const selectDestination = (state: AppState) => state.nav.destination;
export const selectTravelTimeInfo = (state: AppState) =>
  state.nav.travelTimeInfo;

export default navSlice.reducer;
