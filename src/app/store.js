import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/login/userSlice";
import profileReducer from "../features/profile/profileSlice";
import searchReducer from "../features/searchResult/searchSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    search: searchReducer,
  },
});
