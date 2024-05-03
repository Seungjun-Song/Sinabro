import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const invitedUserListSlice =  createSlice({
    name: 'invitedUserList',
    initialState,
    reducers: {
        addInvitedUserList: (state, action) => {
            state.value.push(action.payload)
        },
        removeInvitedUserByIndex: (state, action) => {
            const removeIndex = action.payload
            state.value.splice(removeIndex, 1)
        },
        clearInvitedUserList: (state) => {
            state.value = []
        },
    }
})

export const {addInvitedUserList, removeInvitedUserByIndex, clearInvitedUserList} = invitedUserListSlice.actions

export default invitedUserListSlice.reducer