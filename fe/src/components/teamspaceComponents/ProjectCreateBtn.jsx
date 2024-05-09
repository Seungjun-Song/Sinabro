import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import getEnv from '../../utils/getEnv'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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

    const navigate = useNavigate()

    const createProject = async () => {
        try {
            const res = await axios.post(`${back_url}/teams/projects`, { // 쿠키 제대로 받아지면 실행되는지 확인해야함
                projectName: createProjectInfo.value.projectName,
                projectInfo: createProjectInfo.value.projectInfo,
                projectImg: createProjectInfo.value.projectImg,
                projectRepo: createProjectInfo.value.projectRepo,
                memberList: createProjectInfo.value.memberList,
            })
            console.log(res.data)
            navigate('/mainPage')
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
