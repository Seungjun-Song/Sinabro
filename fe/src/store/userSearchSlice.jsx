import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const userSearchSlice =  createSlice({
    name: 'userSearch',
    initialState,
    reducers: {
        setUserSearch: (state, action) => {
            state.value = action.payload
        },
        clearUserSearch: (state) => {
            state.value = []
        },
    }
})

export const {setUserSearch, clearUserSearch} = userSearchSlice.actions

export default userSearchSlice.reducer