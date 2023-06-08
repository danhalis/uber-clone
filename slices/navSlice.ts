import { createSlice } from "@reduxjs/toolkit";

interface NavState {
  origin: any;
  destination: any;
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

export default navSlice.reducer;
