import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router';
import { motion } from "framer-motion"

import CkEditor from './CkEditor';
import { useState } from 'react';

import { GlobalColor } from '../../services/color';
import getEnv from '../../utils/getEnv';
import axios from 'axios';

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
    align-items: center;
    justify-content: center;

    width: 100%;

    margin: 1rem 0 2rem 0;
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

const CreateTeamPost = ({ isdark, postContent, setPostContent }) => {
    const navigate = useNavigate();

    const back_url = getEnv('BACK_URL');

    const submit = () =>{

        const tagList = postContent.tag.split(" ");
        
        axios.post(`${back_url}/communities`, {
            boardId: postContent.id,
            boardTitle: postContent.title,
            boardContent: postContent.content,
            boardImg: "https://firebase.com/v4/jbbbejqhuabsaskdb.jpg",
            projectLink: "https://k10e103.p.ssafy.io/my-code-server",
            projectId: 1,
            subCategoryId: 402,
            boardTag: tagList,
        },
        {withCredentials: true}
        )
        .then(res => {
            navigate('/communityMainPage', { state: { kind: {id: 402, name: "team"}, page: 1 } });
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
                    isDark={isdark}>
                </Title>
            </Header>

            <Content>
                <CkEditor
                    postContent={postContent}
                    setPostContent={setPostContent}
                    isDark={isdark}
                />
                <Tag
                    placeholder='표현하고 싶은 태그를 입력해주세요 ! 태그는 스페이스로 구분됩니다. 😃'
                    value={postContent.tag}
                    onChange={onChangeTag}
                    isDark={isdark}>
                </Tag>
            </Content>

            <Bottom>
                <Buttons>
                    <Cancel 
                        whileHover={{
                            scale: 1.1,
                        }}
                        onClick={() => navigate('/communityMainPage', {state: {kind: {id: 402, name: "team"}}})}>
                        취소
                    </Cancel>
                    <Save 
                        onClick={() => submit()}
                        whileHover={{ 
                            scale: 1.1,
                        }}    
                    >
                        등록
                    </Save>
                </Buttons>
            </Bottom>
        </MemberPost>
    )
}

export default CreateTeamPost;