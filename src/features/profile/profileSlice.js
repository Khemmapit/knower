import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {
    choose_profile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { choose_profile } = profileSlice.actions;
export const selectProfile = (state) => state.profile.profile;
export default profileSlice.reducer;
