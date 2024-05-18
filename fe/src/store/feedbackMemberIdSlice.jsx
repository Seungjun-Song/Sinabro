import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        id: null,
        roomId: null,
    }
}

export const feedbackMemberIdSlice =  createSlice({
    name: 'feedbackMemberId',
    initialState,
    reducers: {
        changeFeedbackMemberIdState: (state, action) => {
            state.value.id = action.payload
        },
        changeFeedbackRoomIdState: (state, action) => {
            state.value.roomId = action.payload
        },
    }
})

export const {changeFeedbackMemberIdState, changeFeedbackRoomIdState} = feedbackMemberIdSlice.actions
export default feedbackMemberIdSlice.reducer