import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import getEnv from '../../utils/getEnv'
import { useSelector } from 'react-redux'

const BtnContainer = styled.div`
    color: ${props => props.isDark ? 'grey' : 'white'};
    cursor: pointer;
    background-color: ${props => props.isDark ? 'white' : '#564CAD'};
    border-radius: 7px;
    padding: 1rem 3rem;
    margin-bottom: 5rem;
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.05);
    }
`

const ProjectCreateBtn = ({ isDark }) => {

    const back_url = getEnv('BACK_URL')

    const createProjectInfo = useSelector(state => state.projectCreate)

    const createProject = async () => {
        try {
            await axios.post(`${back_url}/teams/projects`, {
                memberId: createProjectInfo.value.memberId,
                projectName: createProjectInfo.value.projectName,
                projectInfo: createProjectInfo.value.projectInfo,
                projectImg: createProjectInfo.value.projectImg,
                projectRepo: createProjectInfo.value.projectRepo,
                memberList: createProjectInfo.value.memberList,
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <BtnContainer isDark={isDark} className='shadow' onClick={createProject}>
            프로젝트 생성
        </BtnContainer>
    )
}

export default ProjectCreateBtn
