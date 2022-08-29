import { createSlice } from "@reduxjs/toolkit";

type UserStateType = {
    id: string | null
}

const initialState: UserStateType = {
    id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload
        },
        logout: (state, action) => {
            state.id = null
        }
    }
})

export const { reducer: userReducer, actions: userActions } = userSlice
