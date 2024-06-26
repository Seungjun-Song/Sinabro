import React, { useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../../firebase";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { GlobalColor } from "../../../services/color";
const MyPageSidePanelContainer = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 30%;
  flex-direction: column;
  align-items: center;
  justify-content:center;
`;

const SkillArea = styled.span`
  background-color: #8fdd89;
  padding: 0.2rem;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  height: 2rem;
  font-weight: 1.6rem;
  border-radius: 1rem;
`;
const MyImage = styled.img`
  height: 10rem;
  border-radius: 5rem;
`;

const MyName = styled.div`
  height: 2rem;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

const WithOur = styled.div`
  height: 3rem;
  font-size: 1rem;
  color: #696969;
  display: flex;
  align-items: center;
`;

const EditButton = styled.label`
  background-color: #4f61bb;
  color: white;
  width: 90%;
  font-size: 1.2rem;
  padding: 0.1rem;
  display: flex;
  justify-content: end;
  padding-right: 1.2rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.01);
  }
  cursor: pointer;
`;

const MyInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem;
  width: 90%;
  padding-top: 2.5rem;
  gap: 1rem;
`;

const MyInfoInnerBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const SmallImage = styled.img`
  height: 2rem;
  width: 2rem;
`;

const InfoTag = styled.div`
  font-weight: 5%;
  display: flex;
  flex-wrap: wrap;
`;

const WriterPageSidePanel = ({ isDark, userfind }) => {
  const [selectedImage, setSelectedImage] = useState(
    "/images/default_my_image.png"
  );

  return (
    <MyPageSidePanelContainer
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.3 }}
    >
      <SkillArea>{userfind.memberJob}</SkillArea>
      <div style={{ position: "relative" }}>
        <MyImage src={userfind.memberImg} />

      </div>
      <MyName style={{ color: isDark ? "white" : "black", marginTop: '1rem' }}>
        {userfind.nickname}
      </MyName>
      <MyInfoBox>
        <MyInfoInnerBox>
          <FontAwesomeIcon
            icon={faGithub}
            size="2xl"
            color={isDark ? "white" : "black"}
          />
          <InfoTag style={{ color: isDark ? "white" : "black" }}>
            {userfind.memberGit}
          </InfoTag>
        </MyInfoInnerBox>
        <MyInfoInnerBox>
          <FontAwesomeIcon
            icon={faAt}
            size="2xl"
            color={isDark ? "white" : "black"}
          />
          <InfoTag style={{ color: isDark ? "white" : "black" }}>
            {userfind.memberEmail == null ? "None" : userfind.memberEmail}
          </InfoTag>
        </MyInfoInnerBox>
      </MyInfoBox>
    </MyPageSidePanelContainer>
  );
};

export default WriterPageSidePanel;
