import styled from 'styled-components'
import { motion, AnimatePresence } from "framer-motion";

import ProfileIcon from '/image/community/hoverProfile.png'
import PlusIcon from '/image/community/hoverPlus.png'
import ChattingIcon from '/image/community/hoverChatting.png'
import { useNavigate } from 'react-router-dom';

const HoverInfo = styled(motion.div)`
    position: absolute;
    z-index: 999;

    bottom: 2.6rem;
    right: -4rem;

    border: 0px solid black;
    border-radius: 4px;

    display: flex;
    gap: 1rem;

    padding: 0.7rem 1rem;

    background: white;
`

const UserDetail = styled.img`
    cursor: pointer;
`

const PlusUser = styled.img`
`

const Chatting = styled.img`
`
const hoverMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        exit: {opacity: 0, y: 20}
    },
    transition: { duration: 0.3 }
}
const HoverInfoBox = ({hoverTurnOff, comment}) => {

    const navigate = useNavigate();

    const moveToUser = () => {
        console.log(comment)
        navigate(`/writerPage`, {state: {memberId: comment.memberId}})
    }
    
    return(
        <HoverInfo
            {...hoverMotion}
            onMouseLeave={hoverTurnOff}
        >
            <UserDetail
                src={ProfileIcon}
                onClick={() => moveToUser()}
            >
                
            </UserDetail>
            <PlusUser
                src={PlusIcon}
            >
                
            </PlusUser>
            <Chatting
                src={ChattingIcon}
            >
                
            </Chatting>
        </HoverInfo>
    )
}

export default HoverInfoBox;