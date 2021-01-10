import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: null,
  },
  reducers: {
    userSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { userSearch } = searchSlice.actions;
export const selectSearch = (state) => state.search.search;
export default searchSlice.reducer;
