import styled from 'styled-components'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react'

import HoverInfoBox from './HoverInfoBox'

const Comment = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    border-bottom: 1px solid rgba(196, 196, 196, 1);
    padding: 1rem 1rem;

    font-family: Pretendard SemiBold;

`

const WriterInfo = styled.div`
    border-right: 1px solid rgba(196, 196, 196, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`

const WriterProfile = styled(motion.img)`
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
    //color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
`

const ProfileBox = styled.div`
    position:relative;
`

const commentMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    },
    transition: { duration: 0.3 }
}


const CommentBox = ({comment, index}) => {
    const [ hoverState, setHoverState ] = useState(false);

    //const [ hoverPointer, setHoverPointer ] = useState(false);
    //const [ profileHover, setProfileHover ] = useState(false);
    const [ profileClick, setProfileClick ] = useState(false);

    const hoverTurnOff = () =>{
      //  setHoverPointer(true);
        setHoverState(false);
    }

    const hoverTurnOn = () => {
      //  setProfileHover(true);
        setHoverState(true);
    }


    const profileClickEvent = () => {
        if(hoverState){
            setHoverState(false);
        }
        else{
            setHoverState(true);
        }
    }

    return(
        <Comment key={index}
                {...commentMotion}>
            <WriterInfo>
                <ProfileBox>
                {hoverState && (
                    <HoverInfoBox
                        hoverTurnOff={hoverTurnOff}
                    />
                )}
                <WriterProfile
                    src={comment.writerImg}
                    whileHover={{ cursor: "pointer", y : -3}}
                    onMouseEnter={() => hoverTurnOn()}
                    onClick={() => profileClickEvent()}
                />
                </ProfileBox>
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
    )
}

export default CommentBox;