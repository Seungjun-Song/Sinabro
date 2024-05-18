import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const feedbackMemberIdSlice =  createSlice({
    name: 'feedbackMemberId',
    initialState,
    reducers: {
        changeFeedbackMemberIdState: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeFeedbackMemberIdState} = feedbackMemberIdSlice.actions
export default feedbackMemberIdSlice.reducer