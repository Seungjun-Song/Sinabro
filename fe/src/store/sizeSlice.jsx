import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { width: 300, height: 400 },
}

export const sizeSlice =  createSlice({
    name: 'size',
    initialState,
    reducers: {
        setChatSize: (state, action) => {
            state.value = action.payload
        },
        clearsize: (state) => {
            state.value = null
        }
    },
})

export const {setChatSize, clearsize} = sizeSlice.actions

export default sizeSlice.reducer