import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const myChatingListSlice =  createSlice({
    name: 'myChatingList',
    initialState,
    reducers: {
        setMyChatingList: (state, action) => {
            state.value = action.payload
        },
        clearMyChatingList: (state) => {
            state.value = []
        }
    }
})

export const {setMyChatingList, clearMyChatingList} = myChatingListSlice.actions
export default myChatingListSlice.reducer