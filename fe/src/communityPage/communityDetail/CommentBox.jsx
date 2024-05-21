import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";

import HoverInfoBox from "./HoverInfoBox";
import { useSelector } from "react-redux";
import CalTime from "../CalTime";
import getEnv from "../../utils/getEnv";

const Comment = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid rgba(196, 196, 196, 1);
  padding: 1rem 1rem;

  font-family: Pretendard SemiBold;
`;

const WriterInfo = styled.div`
  border-right: 1px solid rgba(196, 196, 196, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 0.5rem;
`;

const WriterProfile = styled(motion.img)`
  width: 2rem;
  border-radius: 10rem;
`;

const WriterName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.8rem;

  padding: 5px;
  margin: 2px;

  word-wrap: break-word;
  width: 5rem;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const Content = styled.div`
  height: 100%;
  font-size: 0.9rem;

  white-space: pre-wrap;
  padding: 0.5rem 0 0 1rem;
`;

const PlusBox = styled.div`
  display: flex;
  justify-content: right;
  gap: 0.4rem;
`;

const DateBox = styled.div`
  text-align: right;
  //color: rgba(0, 0, 0, 0.5);
  font-size: 0.8rem;

  padding-top: 0.3rem;
`;

const DeleteButton = styled.div`
  background: red;
  border: 0px solid red;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  color: white;

  cursor: pointer;
`;

const ProfileBox = styled.div`
  position: relative;
`;

const commentMotion = {
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  variants: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  transition: { duration: 0.3 },
};

const CommentBox = ({
  comment,
  index,
  setOpenChat,
  setSelectedUser,
  deleteComment,
}) => {
  const [hoverState, setHoverState] = useState(false);

  //const [ hoverPointer, setHoverPointer ] = useState(false);
  //const [ profileHover, setProfileHover ] = useState(false);
  const [profileClick, setProfileClick] = useState(false);

  const userInfo = useSelector((state) => state.user.currentUser);
  const back_url = getEnv("BACK_URL");

  const fullDate = new Date(comment.createdDttm);
  const finalDate = CalTime(fullDate);

  const hoverTurnOff = () => {
    //  setHoverPointer(true);
    setHoverState(false);
  };

  const hoverTurnOn = () => {
    //  setProfileHover(true);
    setHoverState(true);
  };

  const profileClickEvent = () => {
    if (hoverState) {
      setHoverState(false);
    } else {
      setHoverState(true);
    }
  };

  return (
    <Comment key={index} {...commentMotion}>
      <WriterInfo>
        <ProfileBox>
          {hoverState && (
            <HoverInfoBox
              hoverTurnOff={hoverTurnOff}
              comment={comment}
              setOpenChat={setOpenChat}
              setSelectedUser={setSelectedUser}
            />
          )}
          <WriterProfile
            src={comment.memberImg}
            whileHover={{ cursor: "pointer", y: -3 }}
            onMouseEnter={() => hoverTurnOn()}
            onClick={() => profileClickEvent()}
          />
        </ProfileBox>
        <WriterName>{comment.memberName}</WriterName>
      </WriterInfo>
      <CommentInfo>
        <Content>{comment.commentContent}</Content>
        <PlusBox>
          <DateBox>{finalDate}</DateBox>
          {comment.memberId === userInfo.uid && (
            <DeleteButton onClick={() => deleteComment(comment.commentId)}>
              삭제
            </DeleteButton>
          )}
        </PlusBox>
      </CommentInfo>
    </Comment>
  );
};

export default CommentBox;
