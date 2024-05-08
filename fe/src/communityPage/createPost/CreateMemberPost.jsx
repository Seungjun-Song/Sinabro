import styled, { css } from 'styled-components'

import { useNavigate } from 'react-router';
import { motion } from "framer-motion"
import { useState } from 'react';
import axios from 'axios';
import { faDesktop, faCog, faLeaf } from '@fortawesome/free-solid-svg-icons';

import CkEditor from './CkEditor';

import { GlobalColor } from '../../services/color';
import CreateJobsBox from './CreateJobsBox';
import getEnv from '../../utils/getEnv';

const MemberPost = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 96%;

    margin: 0 0 0 3rem;
`

const Header = styled(motion.div)`

    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    margin: 1rem 0 1rem 0;
`

const Title = styled.input`
    width: 100%;
    height: 3rem;
    font-size: 2rem;
    border: none;
    outline: none;
    border-bottom: 2px solid rgba(189, 189, 189, 1);

    &::placeholder {
        color: rgba(189, 189, 189, 1);
        font-size: 2rem; 
    }

    ${props => props.isDark && css`
        background: ${GlobalColor.colors.primary_black50};

    `}

`

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    gap: 1rem;

    width: 100%;
    height: 100%;

    margin: 1rem 0 2rem 0;
`

const Tag = styled.input`
    width: 100%;
    padding: 0.5rem 0 0.5rem 0.8rem;

    background: rgba(248, 248, 248, 1);

    border: 1px solid #ccc;
    border-radius: 8px;

    &::placeholder {
        color: rgba(157, 157, 157, 1);
        
    }

    ${props => props.isDark && css`
        background: ${ GlobalColor.colors.primary_black50}
    `}
`

const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    margin: 0 0 2rem 0;
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    margin-left: auto;
`

const Cancel = styled(motion.div)`
    color: rgba(150, 143, 216, 1);
    text-align: center;
    padding: 0.2rem 1rem;
    border: 2px solid rgba(150, 143, 216, 1);
    border-radius: 5px;

    cursor: pointer; 
`

const Save = styled(motion.div)`
    color: white;
    background: rgba(150, 143, 216, 1);
    text-align: center;
    padding: 0.2rem 1rem;
    border: 0 solid rgba(150, 143, 216, 1);
    border-radius: 5px;

    cursor: pointer; 
`

const headerMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    },
    transition: { duration: 0.3 }
}

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55IjoiSFA1MCIsIm1lbWJlcklkIjo5NDQyOTEyMCwiZW1haWwiOiJ3aGRybnJkbDc4OUBuYXZlci5jb20iLCJtZW1iZXJOYW1lIjoiSm9uZ0tvb2tFIiwibWVtYmVyR2l0IjoiaHR0cHM6Ly9naXRodWIuY29tL0pvbmdLb29rRSIsIm1lbWJlckltZyI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS85NDQyOTEyMD92PTQiLCJpYXQiOjE3MTQ3MTM2NTEsImV4cCI6MTc1MDcxMzY1MX0.SrKj_R2pOGU6FpRn38U4jeqUCeuo0woyVd5J3fEBt4g'
    }
})


const CreateMemberPost = ({ isDark, postContent, setPostContent }) => {
    const navigate = useNavigate();

    const back_url = getEnv('BACK_URL')

    // const [ jobInfo, setJobInfo ] = useState({
    //     backTarget: 0,
    //     backTotal: 0,
    //     frontTotal: 0,
    //     frontTarget: 0,
    // })

    const [ jobInfo, setJobInfo ] = useState([
        {
            id: 1,
            name: "백",
            borderColor: "#315DCC",
            icon: faCog,
            target: 0,
            total: 0,
        },
        {
            id: 2, 
            name: "프론트",
            borderColor: "#3DC7AE",
            icon: faDesktop,
            target: 0,
            total: 0,
        }

    ])

    const submit = () =>{

        console.log(jobInfo[0].target);
        axios.post(`${back_url}/communities`, {
            boardId: 0,
            boardTitle: postContent.title,
            boardContent: postContent.content,
            boardImg: "https://firebase.com/v4/jbbbejqhuabsaskdb.jpg",
            projectLink: "https://k10e103.p.ssafy.io/my-code-server",
            projectId: 1,
            subCategoryId: 401,
            requiredbackEnd: 0, //parseInt(jobInfo[0].target),
            requiredFrontEnd: 0, //parseInt(jobInfo[1].target),
            requiredFullStack: 0,
            boardTag: ["kk", "kkl"],
        },
        // {withCredentials: true}
        )
        .then(response => {
            console.log("save");
            navigate('/communityMainPage', {state: {kind: "member"}});
        })
        .catch(err => {
            console.log(err);
        });
        
    
    }

    const onChangeTitle = (e) =>{
        setPostContent((prevState) => {
            return{...prevState, title: e.target.value}
        });
    }

    const onChangeTag = (e) => {
        setPostContent((prevState) => {
            return{...prevState, tag: e.target.value}
        })
    }

    return(
        <MemberPost>
            <Header
                {...headerMotion}
            >
                <Title
                    placeholder='제목을 입력하세요'
                    value={postContent.title}
                    onChange={onChangeTitle}
                    isDark={isDark}>
                </Title>
                <CreateJobsBox
                    kind={"member"}
                    jobInfo={jobInfo}
                    setJobInfo={setJobInfo}
                >
                </CreateJobsBox>
            </Header>

            <Content>
                <CkEditor
                    postContent={postContent}
                    setPostContent={setPostContent}
                    isDark={isDark}
                />
                <Tag
                    placeholder='프로젝트 관련된 태그를 입력해주세요 ! 태그는 스페이스로 구분됩니다. 😃'
                    value={postContent.tag}
                    onChange={onChangeTag}
                    isDark={isDark}>
                    
                </Tag>
            </Content>

            <Bottom>
                <Buttons>
                    <Cancel 
                        whileHover={{
                            scale: 1.1,
                        }}
                        onClick={() => navigate('/communityMainPage', {state: {kind: "member"}})}>
                        취소
                    </Cancel>
                    <Save 
                        whileHover={{
                            scale: 1.1,
                        }}
                        onClick={() => submit()}>
                        등록
                    </Save>
                </Buttons>
            </Bottom>
        </MemberPost>
    )
}

export default CreateMemberPost;