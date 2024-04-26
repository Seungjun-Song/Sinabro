import styled from 'styled-components'
import { motion } from "framer-motion";

import ProfileIcon from '/image/community/hoverProfile.png'
import PlusIcon from '/image/community/hoverPlus.png'
import ChattingIcon from '/image/community/hoverChatting.png'

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
const HoverInfoBox = () => {
    return(
        <HoverInfo
            {...hoverMotion}
        >
            <UserDetail
                src={ProfileIcon}
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