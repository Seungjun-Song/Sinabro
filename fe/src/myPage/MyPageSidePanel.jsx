import React from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import getEnv from "../utils/getEnv";
import { useDispatch, useSelector } from "react-redux";
import { setPhotoURL } from "../store/userSlice";
const MyPageSidePanelContainer = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SkillArea = styled.span`
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
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 1.5rem 0 1.5rem 0;
  word-break: break-all;
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

  padding-top: 2.5rem;
  gap: 1rem;

  border-top: 4px solid #4f61bb;

  margin: 10px;
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

const GitLink = styled.a`
  font-weight: 5%;
  display: flex;
  flex-wrap: wrap;
  text-decoration: none;
`;
const InfoTag = styled.div`
  font-weight: 5%;
  display: flex;
  flex-wrap: wrap;
`;
const getColor = (memberJob) => {
  // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
  // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
  return memberJob === "프론트엔드"
    ? "#3DC7AE"
    : memberJob === "백엔드"
    ? "#315DCC"
    : memberJob === "풀스택"
    ? "#6C31CC"
    : "black";
};
const MyPageSidePanel = ({ isDark, userfind ,isMe}) => {
  const back_url = getEnv("BACK_URL");
  const userInfo = useSelector((state) => state.user.currentUser);
  // console.log('userInfo', userInfo)
  const dispatch = useDispatch();

  const handleImageChange = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];

      // Firebase Storage에 이미지 업로드
      const storage = getStorage(app);
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);

      // 업로드된 이미지의 다운로드 URL 받아오기
      const imageUrl = await getDownloadURL(storageRef);

      try {
        const res = await axios.post(
          `${back_url}/members/images?img=${imageUrl}`
        );
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
      dispatch(setPhotoURL(imageUrl));
    };
    input.click();
  };

  return (
    <MyPageSidePanelContainer
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.3 }}
    >
      <SkillArea style={{backgroundColor:getColor(userfind.memberJob)}} >{userfind.memberJob}</SkillArea>
      <div style={{ position: "relative" }}>
        <MyImage src={userfind.memberImg} />
        {isMe && (
          <motion.div
            onClick={handleImageChange}
            whileHover={{ color: "#BAB2FF" }}
            className="shadow"
            style={{
              cursor: "pointer",
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: "0.75rem",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
            }}
          >
            <FontAwesomeIcon icon={faFaceSmile} />
          </motion.div>
        )}
      </div>
      <MyName style={{ color: isDark ? "white" : "black" }}>
        {userfind.nickname}
      </MyName>
      {/* <WithOur></WithOur> */}
      {/* <EditButton>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        E D I T
      </EditButton> */}
      <MyInfoBox>
        <MyInfoInnerBox>
          <FontAwesomeIcon
            icon={faGithub}
            size="2xl"
            color={isDark ? "white" : "black"}
          />
          <GitLink
            style={{ color: isDark ? "white" : "black" }}
            href={userInfo.memberGit}
            target="_blank"
          >
            {userfind.memberGit}
          </GitLink>
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

export default MyPageSidePanel;
