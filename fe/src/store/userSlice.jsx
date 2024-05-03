import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {
        uid: '',
        photoURL: '',
        displayName: '',
        token: '',
    }
}

export const userSlice =  createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser.uid = action.payload.uid
            state.currentUser.displayName = action.payload.displayName
            state.currentUser.token = action.payload.token
        },
        clearUser: (state) => {
            state.currentUser = {}
        },
        setPhotoURL: (state, action) => {
            state.currentUser = {
                ...state.currentUser,
                photoURL: action.payload
            }
        }
    }
})

export const {setPhotoURL, clearUser, setUser} = userSlice.actions

export default userSlice.reducer