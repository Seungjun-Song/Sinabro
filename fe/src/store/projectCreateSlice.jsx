import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        memberId: '',
        projectName: '',
        projectInfo: '',
        projectImg: '',
        projectRepo: '',
        memberList: [],
    }
}

export const projectCreateSlice = createSlice({
    name: 'projectCreate',
    initialState,
    reducers: {
        saveProjectMemberId: (state, action) => {
            state.value.memberId = action.payload
        },
        saveProjectName: (state, action) => {
            state.value.projectName = action.payload
        },
        saveProjectInfo: (state, action) => {
            state.value.projectInfo = action.payload
        },
        saveProjectImg: (state, action) => {
            state.value.projectImg = action.payload
        },
        saveProjectRepo: (state, action) => {
            state.value.projectRepo = action.payload
        },
        addProjectMemberList: (state, action) => {
            state.value.memberList.push(action.payload)
        },
        removeProjectMemberAtIndex: (state, action) => {
            const indexToRemove = action.payload;
            state.value.memberList.splice(indexToRemove, 1);
        },
        updateProjectMemberAtIndex: (state, action) => {
            const { index, newValue } = action.payload;
            state.value.memberList[index].categoryId = newValue;
        },
        clearProjectCreate: (state) => {
            state.value.memberId = ''
            state.value.projectName = ''
            state.value.projectInfo = ''
            state.value.projectImg = ''
            state.value.projectRepo = ''
            state.value.memberList = []
        },
    }
})

export const { saveProjectMemberId, saveProjectName, saveProjectInfo, saveProjectImg, saveProjectRepo, addProjectMemberList, clearProjectCreate, removeProjectMemberAtIndex, updateProjectMemberAtIndex } = projectCreateSlice.actions

export default projectCreateSlice.reducer