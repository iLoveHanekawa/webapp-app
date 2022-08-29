import { configureStore } from "@reduxjs/toolkit";
import { application } from "express";
import { navReducer } from "../features/NavBar/NavSlice";
import { tokenReducer } from "../features/Token/tokenSlice";
import { userReducer } from "../features/User/userSlice";

const store = configureStore({
    reducer: {
        nav: navReducer,
        token: tokenReducer,
        user: userReducer
    }
})

export default store
export type StateType = ReturnType<typeof store.getState> 
export type AppDispatchType = typeof store.dispatch