import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
