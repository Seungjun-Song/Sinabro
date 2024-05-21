import styled, { css } from 'styled-components'

import { useNavigate } from 'react-router';
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { faDesktop, faCog, faLeaf } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
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

const CreateMemberPost = ({ isDark, postContent, setPostContent, selectedPjtId, jobInfo, setJobInfo }) => {
    const navigate = useNavigate();
    const [warning, setWarning ] = useState("내용을 채워주세요!");
    const [ blocking, setBlocking ] = useState(true);

    const back_url = getEnv('BACK_URL')

    const getByteSize = (str) => {
        return new Blob([str]).size;
    }

    useEffect(() => {
        console.log(getByteSize(postContent.content))
        //console.log(postContent.content)
        if(postContent.content == null || postContent.content.length <= 0) {
            setWarning("내용을 채워주세요!");
            setBlocking(true);
            return;
        }

        if(getByteSize(postContent.content) > 15000){
            setWarning("내용이 너무 길어요");
            setBlocking(true);
            return;
        }

    
        //제목이 비었을 때 title
        if(postContent.title == null || postContent.title.length <= 0) {
            setWarning("제목이 비었어요!");
            setBlocking(true);
            return;
        }

        if(getByteSize(postContent.title) > 200){
            setWarning("제목이 너무 길어요");
            setBlocking(true);
            return;
        }
        
        //팀 선택이 비었을 때 team
        if(selectedPjtId === -1) {
            setWarning("팀을 선택해 주세요!");
            setBlocking(true);
            return;
        }
        
        //required가 둘 다 0일 때
        if(jobInfo[0].target == 0 && jobInfo[1].target == 0){
            setWarning("모집 인원 수를 채워주세요!")
            setBlocking(true);
            return;
        }
        
        //총원 3명 넘을 때
        if(jobInfo[0].target + jobInfo[1].target > 3){
            setWarning("프로젝트 인원은 3명 이하로 가능해요!")
            setBlocking(true);
            return;
        }
        //required < recruite일 때 people
        if(jobInfo[0].target < jobInfo[0].total || jobInfo[1] < jobInfo[1]) {
            setWarning("목표 인원수는 현재 인원수를 넘으면 안돼요!")
            setBlocking(true);
            return;
        }

        

        setBlocking(false)
    }, [postContent, jobInfo, selectedPjtId])

    const submit = () =>{
        //태그 정리
        const tagList = postContent.tag.split(" ");

       // console.log("submit", postContent.content)
        if(blocking){
            Swal.fire(warning);
            return;
        }


        if(!blocking){
        axios.post(`${back_url}/communities`, {
            boardId: postContent.id,
            boardTitle: postContent.title,
            boardContent: postContent.content,
            boardImg: "https://firebase.com/v4/jbbbejqhuabsaskdb.jpg",
            projectLink: "https://k10e103.p.ssafy.io/my-code-server",
            projectId: selectedPjtId,
            subCategoryId: 401,
            requiredPeopleBackEnd: jobInfo[0].target, //parseInt(jobInfo[0].target),
            requiredPeopleFrontEnd: jobInfo[1].target, //parseInt(jobInfo[1].target),
            recruitedPeopleBackEnd: jobInfo[0].total,
            recruitedPeopleFrontEnd: jobInfo[1].total,
            requiredFullStack: 0,
            boardTag: tagList,
        },
        {withCredentials: true}
        )
        .then(response => {
            navigate('/communityMainPage', { state: { kind: {id: 401, name: "member"}, page: 1 } });
        })
        .catch(err => {
            console.log(err);
        });
        
        }
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
                    kind={{id: 401, name: "member"}}
                    jobInfo={jobInfo}
                    setJobInfo={setJobInfo}
                    postContent={postContent}
                    setPostContent={setPostContent}
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
                    {blocking && 
                        <>{warning}</>
                    }
                    <Cancel 
                        whileHover={{
                            scale: 1.1,
                        }}
                        onClick={() => navigate('/communityMainPage', {state: {kind: {id: 401, name: "member"}}})}>
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