import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const myProjectListSlice =  createSlice({
    name: 'myProjectList',
    initialState,
    reducers: {
        setMyProjectList: (state, action) => {
            state.value = action.payload
        },
        clearMyProjectList: (state) => {
            state.value = []
        }
    }
})

export const {setMyProjectList, clearMyProjectList} = myProjectListSlice.actions
export default myProjectListSlice.reducer