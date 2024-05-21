import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const inviteUserSlice =  createSlice({
    name: 'inviteUser',
    initialState,
    reducers: {
        setInviteUser: (state, action) => {
            state.value = action.payload
        },
        clearInviteUser: (state) => {
            state.value = null
        },
    }
})

export const {setInviteUser, clearInviteUser} = inviteUserSlice.actions

export default inviteUserSlice.reducer