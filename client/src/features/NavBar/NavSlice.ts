import { createSlice } from "@reduxjs/toolkit";

const initialState: { logged: boolean } = {
    logged: false
}

const NavSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.logged = action.payload
        },
        loggedOut: (state, action) => {
            state.logged = action.payload
        }
    }
})

export const { actions: navActions, reducer: navReducer } = NavSlice