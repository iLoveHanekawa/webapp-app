import { configureStore } from "@reduxjs/toolkit";
import { navReducer } from "../features/NavBar/NavSlice";

const store = configureStore({
    reducer: {
        nav: navReducer
    }
})

export default store