import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/login/userSlice";

export default configureStore({
  reducer: {
    user:userReducer,
  },
});
