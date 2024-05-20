import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const myCurrentProjectSlice =  createSlice({
    name: 'myCurrentProject',
    initialState,
    reducers: {
        setMyCurrentProject: (state, action) => {
            state.value = action.payload
        },
        clearMyCurrentProject: (state) => {
            state.value = null
        }
    }
})

export const {setMyCurrentProject, clearMyCurrentProject} = myCurrentProjectSlice.actions
export default myCurrentProjectSlice.reducer