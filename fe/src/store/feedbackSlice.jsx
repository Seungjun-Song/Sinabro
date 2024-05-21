import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const feedbackSlice =  createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setFeedbackState: (state, action) => {
            state.value = action.payload
        },
        clearFeedbackState: (state) => {
            state.value = false
        },
    }
})

export const {setFeedbackState, clearFeedbackState} = feedbackSlice.actions

export default feedbackSlice.reducer