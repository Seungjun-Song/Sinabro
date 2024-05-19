import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
}

export const projectRoomIdSlice =  createSlice({
    name: 'projectRoomId',
    initialState,
    reducers: {
        setProjectRoomId: (state, action) => {
            state.value = action.payload
        },
        clearProjectRoomId: (state) => {
            state.value = null
        }
    },
})

export const {setProjectRoomId, clearProjectRoomId} = projectRoomIdSlice.actions

export default projectRoomIdSlice.reducer