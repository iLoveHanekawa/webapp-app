import { createSlice } from "@reduxjs/toolkit";

type TokenStateType = {
    value: string | null
}

const initialState: TokenStateType = { value: null }

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload
        },
        removeToken: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { reducer: tokenReducer, actions: tokenActions} = tokenSlice