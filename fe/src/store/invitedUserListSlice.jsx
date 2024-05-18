import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const initialState = {
    value: []
}



export const invitedUserListSlice =  createSlice({
    name: 'invitedUserList',
    initialState,
    reducers: {
        addInvitedUserList: (state, action) => {
        
            if(state.value.length >= 3){
                Swal.fire("최대 인원을 초과했습니다. 최대 인원은 3명입니다.")
                return;
            }

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