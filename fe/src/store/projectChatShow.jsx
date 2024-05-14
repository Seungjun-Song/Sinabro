import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const projectChatShowSlice =  createSlice({
    name: 'projectChatShow',
    initialState,
    reducers: {
        changeProjectChatState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeProjectChatState} = projectChatShowSlice.actions
export default projectChatShowSlice.reducer