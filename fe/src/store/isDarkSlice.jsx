import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: false
}

export const isDarkSlice =  createSlice({
    name: 'isDark',
    initialState,
    reducers: {
        toggleisDarkState: (state, action) => {
            state.isDark = !state.isDark
        }
    }
})

export const {toggleisDarkState} = isDarkSlice.actions
export default isDarkSlice.reducer