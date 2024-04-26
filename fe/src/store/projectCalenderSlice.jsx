import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const projectCalenderSlice =  createSlice({
    name: 'projectCalender',
    initialState,
    reducers: {
        changeProjectCalenderState: (state, action) => {
            state.value = action.payload
        },
        toggleProjectCalenderState: (state, action) => {
            state.value = !state.value
        }
    }
})

export const {changeProjectCalenderState, toggleProjectCalenderState} = projectCalenderSlice.actions
export default projectCalenderSlice.reducer