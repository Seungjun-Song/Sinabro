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
        setInvitedUserList: (state, action) => {
            state.value = action.payload
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

export const {addInvitedUserList, removeInvitedUserByIndex, clearInvitedUserList, setInvitedUserList} = invitedUserListSlice.actions

export default invitedUserListSlice.reducer