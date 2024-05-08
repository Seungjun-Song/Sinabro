import { useState } from 'react'
import styled, { css } from 'styled-components'
import { motion } from "framer-motion";

import WriterImg from '/image/nav/tempPjtImg.png'
import CommentBox from './CommentBox'

import { GlobalColor } from '../../services/color';

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

const CommentWindow = ({ isDark }) => {
    const [count, setCount] = useState(0);

    const commentDate = [
        {
            id: 1,
            writerId: 64572911,
            writerImg: WriterImg,
            writerName: "이름이 깁니다",
            content: "어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?어쩌라구요. 텍스트가 만약 길어진다면?",
            date: "2024-01-01"
        },
        {
            id: 2,
            writerId: 1,
            writerImg: WriterImg,
            writerName: "seo",
            content: "어쩌라구요",
            date: "2024-01-01"
        },
        {
            id: 2,
            writerId: 1,
            writerImg: WriterImg,
            writerName: "eun",
            content: "어쩌라구요",
            date: "2024-01-01"
        },
    ]

    return(
        <Window>
            <Count>
                댓글 {commentDate.length}
            </Count>
            <Inputzon>
                <Input
                    placeholder='댓글을 입력해 프로젝트에 참여해보세요 ! '
                    isDark={isDark}    
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
                >
                    등록
                </Submit>
            </Inputzon>
            <Comments>
                {commentDate.map((comment, index) => (
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