import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const toDoListSlice =  createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        setToDoList: (state, action) => {
            state.value = action.payload
        },
        addToDoList: (state, action) => {
            state.value.push(action.payload)
        },
        removeToDoItem: (state, action) => {
            const index = action.payload;

            if (index >= 0 && index < state.value.length) {
                state.value.splice(index, 1)
            }
        },
        delToDOlist: (state, action) => {
            state.value = []
        },
        changeState: (state, action) => {
            const {index, changeValue} = action.payload
            if (index >= 0 && index < state.value.length) {
                state.value[index].subCategoryId = changeValue
            }
        },
    },
})

export const {setToDoList, addToDoList, removeToDoItem, delToDOlist, changeState} = toDoListSlice.actions

export default toDoListSlice.reducer