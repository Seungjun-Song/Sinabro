import React from 'react'
import styled from 'styled-components'
import MyPageSidePanel from './MyPageSidePanel'
import MyPageMainPanel from './MyPageMainPanel'
import Navbar from '../components/navs/Navbar'
import { useSelector } from 'react-redux'
import { GlobalColor } from '../services/color'

const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: center;
`

const MainBox = styled.div`
    display: flex;
    width: 80%;
    height: 100%;
    margin-top: 4rem;
`

const MyPage = () => {
    const isDark = useSelector(state =>state.isDark.isDark)
    return (
        <MyPageContainer style={{backgroundColor: isDark ? GlobalColor.colors.primary_black :"white" , transition:"0.3s"}} >
            <div style={{ width: '100%', height: '80px'}}>
                <Navbar/>
            </div>
            <MainBox>
                <MyPageSidePanel isDark={isDark} />
                <MyPageMainPanel isDark={isDark}/>
            </MainBox>
        </MyPageContainer>
    )
}

export default MyPage