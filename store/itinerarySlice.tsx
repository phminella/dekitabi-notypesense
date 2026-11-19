import { createSlice } from "@reduxjs/toolkit";

export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: {
    itineraries: null,
  },
  reducers: {
    setItineraries: (state: any | object[], action: any) => {
      state.itineraries = action.payload;
    },
  },
});

export const { setItineraries } = itinerarySlice.actions;
export default itinerarySlice.reducer;
