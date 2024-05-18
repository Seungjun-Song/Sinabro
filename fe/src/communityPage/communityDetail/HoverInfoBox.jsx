import styled from 'styled-components'
import { motion, AnimatePresence } from "framer-motion";

import ProfileIcon from '/image/community/hoverProfile.png'
import PlusIcon from '/image/community/hoverPlus.png'
import ChattingIcon from '/image/community/hoverChatting.png'
import { getDatabase, onValue, ref, get, child, push, remove} from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setMyChatingList } from '../../store/myChatingListSlice';

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
    cursor: pointer;
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
const HoverInfoBox = ({hoverTurnOff, comment, setOpenChat, setSelectedUser}) => {

    const userInfo = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const moveToUser = () => {
        navigate(`/writerPage`, {state: {memberId: comment.memberId}})
    }

    const startChating = async () =>{
        setOpenChat(true);
        
        const chatId = parseInt(comment.memberId)
        
        setSelectedUser({id: chatId, name: comment.memberName});
        
        //리스트 생성
        const roomId = chatId > userInfo.uid ? parseInt(chatId + "" + userInfo.uid) 
                            : parseInt(userInfo.uid + "" + chatId);

        const db = getDatabase();  
        if(chatId){
            const chatRef = ref(db, `chatList/${chatId}`);
            const snapshot = await get(chatRef);
            const data = snapshot.val();

            if(data){
                const chatList = Object.values(data);
                let isExist = false;
                chatList.map((chat, index) => {
                  if(chat.projectId == roomId){
                    isExist = true;
                  }
                })
        
                if(!isExist){    
                  push(chatRef, {
                    projectId: roomId,
                    projectName: userInfo.displayName,
                    lastChat: "?",
                    day: "2024.04.26",
                    projectImg: userInfo.photoURL,
                  })

                  setMyChatingList([...myChatingList, {
                    projectId: roomId,
                    projectName: userInfo.displayName,
                    lastChat: "?",
                    day: "2024.04.26",
                    projectImg: userInfo.photoURL,
                  }])

                }
            }
            else{
                push(chatRef, {
                  projectId: roomId,
                  projectName: userInfo.displayName,
                  lastChat: "?",
                  day: "2024.04.26",
                  projectImg: userInfo.photoURL,
                })

                setMyChatingList([...myChatingList, {
                    projectId: roomId,
                    projectName: userInfo.displayName,
                    lastChat: "?",
                    day: "2024.04.26",
                    projectImg: userInfo.photoURL,
                  }])
              }
        }

        if(userInfo.uid){
            const chatRefSec = ref(db, `chatList/${userInfo.uid}`)
            const snapshot = await get(chatRefSec);
            const data = snapshot.val();

            if(data){
                const chatList = Object.values(data);
                let isExist = false;
                chatList.map((chat, index) => {
                if(chat.projectId == roomId){
                    isExist = true;
                }
                })

                if(!isExist){
                push(chatRefSec, {
                projectId: roomId,
                projectName: comment.memberName,
                lastChat: "?",
                day: "2024.04.26",
                projectImg: comment.memberImg,
                })

                setMyChatingList([...myChatingList, {
                    projectId: roomId,
                    projectName: userInfo.displayName,
                    lastChat: "?",
                    day: "2024.04.26",
                    projectImg: userInfo.photoURL,
                  }])
                }
            }
            else{
                push(chatRefSec, {
                    projectId: roomId,
                    projectName: comment.memberName,
                    lastChat: "?",
                    day: "2024.04.26",
                    projectImg: comment.memberImg,
                })

                setMyChatingList([...myChatingList, {
                    projectId: roomId,
                    projectName: userInfo.displayName,
                    lastChat: "?",
                    day: "2024.04.26",
                    projectImg: userInfo.photoURL,
                  }])
            }
        }

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
                onClick={() => startChating(true)}
            >
                
            </Chatting>
        </HoverInfo>
    )
}

export default HoverInfoBox;