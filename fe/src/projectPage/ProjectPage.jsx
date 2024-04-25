import React from 'react'
import styled from 'styled-components'
import ProjectPageNavBar from './ProjectPageNavBar'
import ProjectPageLeftPanel from './ProjectPageLeftPanel'
import ProjectPageRightPanel from './ProjectPageRightPanel'
import { useSelector } from 'react-redux'
import { Calender } from '../components/calender/Calender'


const ProjectContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const ProjectMainContainer = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
`

const ProjectPage = () => {

  const isProjectCalenderShow = useSelector(state => (state.projectCalender))

  return (
    <ProjectContainer>
      <ProjectPageNavBar />
      <ProjectMainContainer>
        <ProjectPageLeftPanel />
        {isProjectCalenderShow.value === true ?
          <div style={{ height: '100%', width: '100%' }} >
            <Calender />
          </div>
          :
          <iframe
            title="code-server"
            src="https://k10e103.p.ssafy.io/code-server"
            style={{ width: "100%", height: "100%", border: "none" }}
          ></iframe>
        }
        <ProjectPageRightPanel />
      </ProjectMainContainer>
    </ProjectContainer>
  )
}

export default ProjectPage