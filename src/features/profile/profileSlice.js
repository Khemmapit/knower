import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {
    chooseProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { chooseProfile } = profileSlice.actions;
export const selectProfile = (state) => state.profile.profile;
export default profileSlice.reducer;
