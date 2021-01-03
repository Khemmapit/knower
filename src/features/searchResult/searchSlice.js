import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: null,
  },
  reducers: {
    user_search: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { user_search } = searchSlice.actions;
export const selectSearch = (state) => state.search.search;
export default searchSlice.reducer;
