import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        memberId: '',
        projectName: '',
        projectInfo: '',
        projectImg: null,
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
            const formattedProjectInfo = action.payload.replace(/\n/g, "<br>")
            state.value.projectInfo = formattedProjectInfo
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
        setProjectMemberList: (state,action) => {
            state.value.memberList = action.payload
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
            state.value.projectImg = null
            state.value.projectRepo = ''
            state.value.memberList = []
        },
    }
})

export const { saveProjectMemberId, saveProjectName, saveProjectInfo, saveProjectImg, saveProjectRepo, addProjectMemberList, clearProjectCreate, removeProjectMemberAtIndex, updateProjectMemberAtIndex, setProjectMemberList } = projectCreateSlice.actions

export default projectCreateSlice.reducer