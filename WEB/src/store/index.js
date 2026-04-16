import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import postSlice from "./slice/postSlice";

export const store = configureStore({
    reducer: {
        post: postSlice,
        auth: authSlice,
    },
});
