import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {
        uid: '',
        photoURL: '',
        displayName: '',
        token: '',
        newer: '',
        memberEmail: '',
        memberGit: '',
    }
}

export const userSlice =  createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser.uid = action.payload.uid
            state.currentUser.photoURL = action.payload.photoURL
            state.currentUser.displayName = action.payload.displayName
            state.currentUser.token = action.payload.token
            state.currentUser.newer = action.payload.newer
            state.currentUser.photoURL = action.payload.photoURL
            state.currentUser.memberEmail = action.payload.memberEmail
            state.currentUser.memberGit = action.payload.memberGit
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