import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newMessageState: false,
    projectRightPanelState: false,
    chatState: false,
    isNotificationOn: false,
}

export const newMessageSlice =  createSlice({
    name: 'newMessage',
    initialState,
    reducers: {
        setNewMessageState: (state, action) => {
            state.newMessageState = action.payload
        },
        setProjectRightPanelState: (state, action) => {
            state.projectRightPanelState = action.payload
        },
        setChatState: (state, action) => {
            state.chatState = action.payload
        },
        setIsNotificationOn: (state, action) => {
            state.isNotificationOn = action.payload
        }
    }
})

export const {setChatState, setIsNotificationOn, setNewMessageState, setProjectRightPanelState} = newMessageSlice.actions
export default newMessageSlice.reducer