import { createSlice } from "@reduxjs/toolkit";

type UserStateType = {
    name: string | null
}

const initialState: UserStateType = {
    name: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.name = action.payload
        },
        logout: (state, action) => {
            state.name = action.payload
        }
    }
})

export const { reducer: userReducer, actions: userActions } = userSlice
