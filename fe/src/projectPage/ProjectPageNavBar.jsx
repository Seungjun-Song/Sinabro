import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPhone,
  faSignOut,
  faMicrophoneSlash,
  faPhoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const NavContainer = styled.div`
  width: 100vw;
  height: 8%;
  background-color: #564cad;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const NavRigthBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 1rem;
`;

const UserImage = styled.img`
  height: 45px;
  border-radius: 50%;
`;

const IconHoverBox = styled(motion.div)`
  transition: transform 0.3 ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const ProjectPageNavBar = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isPhoneOn, setIsPhoneOn] = useState(true);

  const navigate = useNavigate();

  return (
    <NavContainer>
      <IconHoverBox>
        <FontAwesomeIcon
          icon={faSignOut}
          style={{ color: "white", cursor: "pointer" }}
          flip="horizontal"
          onClick={() => navigate(-1)}
        />
      </IconHoverBox>
      <NavRigthBox>
        <AnimatePresence mode="wait">
          {isMicOn ? (
            <IconHoverBox
              key="mic1"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                style={{
                  color: "white",
                  cursor: "pointer",
                  height: "1rem",
                  width: "1rem",
                }}
                onClick={() => setIsMicOn(!isMicOn)}
              />
            </IconHoverBox>
          ) : (
            <IconHoverBox
              key="mic2"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <FontAwesomeIcon
                icon={faMicrophoneSlash}
                style={{
                  color: "white",
                  cursor: "pointer",
                  transform: "scaleX(-1)",
                  height: "1rem",
                  width: "1rem",
                }}
                onClick={() => setIsMicOn(!isMicOn)}
              />
            </IconHoverBox>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {isPhoneOn ? (
            <IconHoverBox
              key="phone1"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <FontAwesomeIcon
                icon={faPhone}
                style={{
                  color: "white",
                  cursor: "pointer",
                  height: "1rem",
                  width: "1rem",
                }}
                onClick={() => setIsPhoneOn(!isPhoneOn)}
              />
            </IconHoverBox>
          ) : (
            <IconHoverBox
              key="phone2"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <FontAwesomeIcon
                icon={faPhoneSlash}
                style={{
                  color: "white",
                  cursor: "pointer",
                  height: "1rem",
                  width: "1rem",
                }}
                onClick={() => setIsPhoneOn(!isPhoneOn)}
              />
            </IconHoverBox>
          )}
        </AnimatePresence>
        <UserImage src="/images/user1.png" />
        <UserImage src="/images/user2.png" />
      </NavRigthBox>
    </NavContainer>
  );
};

export default ProjectPageNavBar;
