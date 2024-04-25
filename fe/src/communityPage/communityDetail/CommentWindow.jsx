import { useState } from 'react'
import styled, { css } from 'styled-components'

import WriterImg from '/image/nav/tempPjtImg.png'

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

    border: 1px solid rgba(196, 196, 196, 1);
    border-radius: 5px; 

    resize: none;

    &::placeholder{
        color: gray;
    }

`

const Submit = styled.div`
    padding: 0.5rem 1rem;

    background: rgba(150, 143, 216, 1);
    color: white;
    font-size: 0.8rem;
    font-family: Jamsil Regular;

    border: 0px solid white;
    border-radius: 5px; 


`

const Comments = styled.div`
    width: 100%;

    margin: 0 0 2rem 0;
`

const Comment = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    
    border-bottom: 1px solid rgba(196, 196, 196, 1);
    padding: 1rem 1rem;

`

const WriterInfo = styled.div`
    border-right: 1px solid rgba(196, 196, 196, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`

const WriterProfile = styled.img`
`

const WriterName = styled.div`
    display: flex;
    justify-content: center; 
    font-size: 0.8rem;

    padding: 5px; 
    margin: 2px; 

    word-wrap: break-word; 
    width: 5rem; 
`

const CommentInfo = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

`

const Content = styled.div`
    height: 100%;
    font-size: 0.9rem;

    padding: 0.5rem 0 0 1rem;
`

const Date = styled.div`
    text-align: right;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
`

const CommentWindow = () => {
    const [count, setCount] = useState(0);

    const commentDate = [
        {
            id: 1,
            writerId: 1,
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
                댓글 {count}
            </Count>
            <Inputzon>
                <Input
                    placeholder='댓글을 입력해 프로젝트에 참여해보세요 ! '>
                </Input>
                <Submit>
                    등록
                </Submit>
            </Inputzon>
            <Comments>
                {commentDate.map((comment, index) => (
                    <Comment key={index}>
                        <WriterInfo>
                            <WriterProfile
                                src={comment.writerImg}/>
                            <WriterName>
                                {comment.writerName}
                            </WriterName>
                        </WriterInfo>
                        <CommentInfo>
                            <Content>
                                {comment.content}
                            </Content>
                            <Date>
                                {comment.date}
                            </Date>
                        </CommentInfo>
                    </Comment>
                ))}
            </Comments>
        </Window>
    )
}

export default CommentWindow;