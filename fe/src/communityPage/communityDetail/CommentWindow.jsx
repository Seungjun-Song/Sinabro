import { useState } from 'react'
import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import axios from 'axios';

import WriterImg from '/image/nav/tempPjtImg.png'
import CommentBox from './CommentBox'

import { GlobalColor } from '../../services/color';
import getEnv from '../../utils/getEnv';
import { useSelector } from 'react-redux';

const Window = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 100%;
`

const Count = styled.div`
    display: flex;
    justify-content: start;

    margin: 0 0 0.3rem 0;

    width: 100%;
`

const Inputzon = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;

    width: 100%;
    height: 5rem;
`

const Input = styled.textarea`
    width: 90%;
    height: 100%;

    text-align: start;
    font-size: 0.8rem;

    border: 1px solid ${ GlobalColor.colors.primary_gray };
    border-radius: 5px; 

    resize: none;
    padding: 0.5rem 0 0 1rem;

    &::placeholder{
        color: rgba(0, 0, 0, 0.4);
    }

    ${props => props.isDark && css`
        background: ${ GlobalColor.colors.primary_gray };
        border: 1px solid ${ GlobalColor.colors.primary_gray };
    `}

    transition: 0.3s;

`

const Submit = styled(motion.div)`
    padding: 0.5rem 1rem;

    background: rgba(150, 143, 216, 1);
    color: white;
    font-size: 0.8rem;
    font-family: Jamsil Regular;

    border: 0px solid white;
    border-radius: 5px; 

    cursor: pointer;


`

const Comments = styled.div`
    width: 100%;

    margin: 0 0 2rem 0;
`

const CommentWindow = ({ isDark, commentDate, boardId, setCommentDate }) => {
    const [ newComment, setNewComment ] = useState("");

    const back_url = getEnv('BACK_URL')

    const userInfo = useSelector(state => state.user.currentUser);
    
    const onChange= (data) =>{
        setNewComment(data.target.value);
    }

    const submit = () => {
        axios.post(`${back_url}/communities/comment`, {
            "memberId": userInfo.uid,
            "commentContent": newComment,
            "boardId": boardId
        })
        .then(res => {
            //성공 시 보여지는 것 갱신
            setNewComment("")
            axios.get(`${back_url}/communities/comments/${boardId}/0`)
            .then((res) => {
                //console.log(res.data.result.commentResponseDtos);
                setCommentDate(res.data.result.commentResponseDtos);
            })
            .catch((err) => {
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <Window>
            <Count>
                댓글 {commentDate.length}
            </Count>
            <Inputzon>
                <Input
                    placeholder='댓글을 입력해 프로젝트에 참여해보세요 ! '
                    isDark={isDark}   
                    onChange={onChange} 
                    value={newComment}
                >
                        
                </Input>
                <Submit
                    whileHover={{
                        //scale: 1.01,
                        y: -2,
                        backgroundColor: "white",
                        color: "rgba(150, 143, 216, 1)",
                        border: "2px solid rgba(150, 143, 216, 1)",
                        
                    }}
                    onClick={() => submit()}
                >
                    등록
                </Submit>
            </Inputzon>
            <Comments>
                {commentDate && commentDate.length > 0 && commentDate.map((comment, index) => (
                    <CommentBox
                        comment={comment}
                        key={index}
                    />
                ))}
            </Comments>
        </Window>
    )
}

export default CommentWindow;