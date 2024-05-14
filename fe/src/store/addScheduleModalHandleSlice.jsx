import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const addScheduleModalHandleSlice =  createSlice({
    name: 'addScheduleModalHandle',
    initialState,
    reducers: {
        changeScheduleModalState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeScheduleModalState} = addScheduleModalHandleSlice.actions
export default addScheduleModalHandleSlice.reducer