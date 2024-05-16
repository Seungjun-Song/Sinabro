import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
// Import scrollbar styles
import "./scrollbar.css";
import { GlobalColor } from "../services/color";
import { useDispatch, useSelector } from "react-redux";
import getEnv from "../utils/getEnv";
import axios from "axios";
import MemoryGraph from "./MemoryGraph";
import { setMyCurrentProject } from "../store/myCurrentProjectSlice";
import { useNavigate } from "react-router-dom";
const SearchContainerRightSide = styled.div`
  height: 100%;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchContainerLeftSide = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
`;
const SearchContainer = styled(motion.div)`
  width: 100%;
  border: 3px solid transparent;
  border-image: linear-gradient(to right, #3dc7af, #613acd);
  border-image-slice: 1;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  position: relative;
`;
const MyPageMainPanelContainer = styled.div`
  border: 3px solid #a2a2a2;
  width: 90%;
  overflow-y: auto;
  /* margin-bottom: 3rem; */
  border-radius: 10px;
  margin-left: 1rem;
  padding-left: 4rem;
  padding-right: 4rem;
  /* max-height: 550px; */
  height: 80%;
  padding-bottom: 2rem;
`;

const InnerArea = styled(motion.div)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const InnerText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #204fcf;
`;

const InnerBox = styled(motion.div)`
  border: 3px solid transparent;
  border-image: linear-gradient(to right, #3dc7af, #613acd);
  border-image-slice: 1;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

const SkillBox = styled.div`
  background-color: #f2f2f2;
  padding: 0.2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;
  border-radius: 0.8rem;
  display: flex;
  gap: 1rem;
`;

const SkillDelBtn = styled.div`
  color: #39a0ba;
  font-weight: bold;
  cursor: pointer;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #613acd;
  cursor: pointer;
  margin-left: auto;
`;

const PjtImg = styled(motion.img)`
  width: 25%;
  padding: 1rem;
`;

const MemoryGraphContainer = styled.div`
  display: flex;
`;

const MemoryGraphMainBox = styled.div`
  border: 3px solid transparent;
  border-image: linear-gradient(to right, #3dc7af, #613acd);
  border-image-slice: 1;
  /* background-image: url("/images/obsidian.png"); */
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 30rem;
  /* cursor: pointer; */
  /* 커서 나중에 없애거나 해야함 */
`;

const MemoryGraphSideBox = styled.div`
  width: 50%;
  height: 30rem;
  display: flex;
  flex-direction: column;
`;
const MemoryGraphDescribeBox = styled.div`
  border: 3px solid transparent;
  border-image: linear-gradient(to right, #3dc7af, #613acd);
  border-image-slice: 1;
  margin-left: 2rem;
  width: 100%;
  padding: 1rem;
  max-height: 26rem;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const MemoryGraphButtonBox = styled.div`
  margin-left: 2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const MemoryGraphButton = styled.div`
  font-size: 1rem;
  padding: 0.6rem;
  font-weight: bold;
  background-color: #6c32cd;
  color: white;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const SkillDetail = styled.div`
  padding: 0.2rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  height: 1.8rem;
  border-radius: 0.8rem;
  display: flex;
  gap: 0.8rem;
  font-size: 0.8rem;
  align-items: center;
`;

const SearchInput = styled.input`
  height: 1.8rem;
  flex: 1;
  border: none;
  outline: none;
`;
const dataList = [
  {
    subCategoryName: "React",
    img: "/images/react.png",
    subCategoryId: 101,
  },
  {
    subCategoryName: "Vue",
    img: "/images/vue.png",
    subCategoryId: 102,
  },
  {
    subCategoryName: "HTML",
    img: "/images/html.png",
    subCategoryId: 103,
  },
  {
    subCategoryName: "CSS",
    img: "/images/css.png",
    subCategoryId: 104,
  },
  {
    subCategoryName: "JavaScript",
    img: "/images/js.png",
    subCategoryId: 105,
  },
  {
    subCategoryName: "Java",
    img: "/images/java.png",
    subCategoryId: 106,
  },
  {
    subCategoryName: "Python",
    img: "/images/python.png",
    subCategoryId: 107,
  },
  {
    subCategoryName: "Spring",
    img: "/images/spring.png",
    subCategoryId: 201,
  },
  {
    subCategoryName: "Django",
    img: "/images/django.png",
    subCategoryId: 202,
  },
];

const MyPageMainPanel = ({ isDark, userfind, setUserFind, userInfo }) => {
  const [isSideBoxVisible, setIsSidePanelVisible] = useState(false);
  const back_url = getEnv("BACK_URL");
  const [showModal, setShowModal] = useState(false);
  const [whatSearch, setWhatSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // console.log(userfind)
  const [choiceResults, setChoiceResults] = useState([]);
  const findUser = async () => {
    //   console.log(userInfo.uid);
    try {
      const res = await axios.get(`${back_url}/members/${userInfo.uid}`);
      console.log(res);
      setUserFind(res.data.result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setChoiceResults(userfind.techStacks);
    // console.log(userfind.techStacks)
  }, [userfind]);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const myProjectList = useSelector((state) => state.myProjectList.value); // 잘 들어오는지 확인, 페이지 이동 잘 되는지 확인
  const DelSkill = async (techStackId) => {
    //   console.log(userInfo.uid);
    try {
      const res = await axios.delete(`${back_url}/members`, {
        data: [
          {
            techStackId: techStackId,
          },
        ],
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const AddSkill = async (subCategoryId) => {
    const subCategoryIds = [{ subCategoryId: subCategoryId }];
    console.log(subCategoryIds);
    try {
      const res = await axios.post(`${back_url}/members`, subCategoryIds, {
        withCredentials: true,
      });
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (item) => {
    // choiceResults에서 item.name과 같은 항목을 제외한 나머지를 새로운 배열로 만듭니다.
    await DelSkill(item.techStackId);
    findUser();
  };
  const handleAdd = async (item) => {
    setWhatSearch("");
    await AddSkill(item);
    findUser();
  };

  const handleChange = (event) => {
    setWhatSearch(event.target.value);
    // 입력된 검색어에 따라 결과 필터링
    const filteredResults = dataList.filter((item) => {
      // 만약 item.name이 choiceResults에 포함되어 있지 않고, 검색어에 포함되어 있다면 true를 반환합니다.
      return (
        !choiceResults.some(
          (choiceItem) => choiceItem.subCategoryName === item.subCategoryName
        ) &&
        item.subCategoryName
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
    });
    // console.log(filteredResults); // 필터링된 결과를 console에 출력
    setSearchResults(filteredResults);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <MyPageMainPanelContainer>
        <InnerArea
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          style={{ height: "12rem" }}
        >
          <InnerText
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            Skills
            <div
              style={{ fontSize: "1rem", color: isDark ? "white" : "black" }}
            >
              보유하신 기술 스택입니다!
            </div>
          </InnerText>

          <SearchContainer>
            <SearchContainerLeftSide>
              <AnimatePresence>
                {choiceResults &&
                  choiceResults.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* {console.log(item)} */}
                      <SkillDetail
                        style={{
                          background: isDark
                            ? GlobalColor.colors.primary_black50
                            : "#f2f2f2",
                          color: isDark ? "white" : "black",
                        }}
                      >
                        {/* {없을 때 띄울 글자 생각해야함} */}
                        {item.subCategoryName}
                        <SkillDelBtn onClick={() => handleDelete(item)}>
                          X
                        </SkillDelBtn>
                      </SkillDetail>
                    </motion.div>
                  ))}
              </AnimatePresence>

              <SearchInput
                style={{
                  backgroundColor: isDark
                    ? GlobalColor.colors.primary_black
                    : "white",
                  transition: "0.3s",
                  color: isDark ? "white" : "black",
                }}
                onChange={handleChange}
                value={whatSearch}
              />
            </SearchContainerLeftSide>
            <SearchContainerRightSide>
              <SearchIcon icon={faSearch} />
            </SearchContainerRightSide>
          </SearchContainer>
          {whatSearch && (
            <div
              className="shadow"
              style={{
                // padding:"1rem",
                maxHeight: "100%",
                height:"4rem",
                alignItems:"center",
                display: "flex",
                // flexDirection: "column",
                flexWrap: "wrap",
                // gap: "0.5rem",
                overflowY: "auto",
                borderRadius: "0rem 0rem 0.4rem 0.4rem",
                // backgroundColor:isDark ? GlobalColor.colors.primary_black50 : "white"
              }}
            >
              {searchResults.map((result, index) => (
                <motion.div
                  onClick={() => handleAdd(result.subCategoryId)}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    cursor: "pointer",
                    backgroundColor: "#909EE790",
                    color: "white",
                  }}
                  style={{
                    margin: "0.5rem",
                    display: "flex",
                    gap: "0.8rem",
                    alignItems: "center",
                    padding: "0 1rem",
                    height: "1.3rem",
                    fontSize: "1rem",
                    color: isDark ? "white" : "black",
                    // backgroundColor: isDark ? GlobalColor.colors.primary_black50  : "white",
                  }}
                  key={index}
                >
                  {result.subCategoryName}
                  <img style={{ height: "1.2rem" }} src={result.img} />
                </motion.div>
              ))}
            </div>
          )}
        </InnerArea>
        <InnerArea
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          style={{ marginTop: 0 }}
        >
          <InnerText
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            Works
            <div
              style={{ fontSize: "1rem", color: isDark ? "white" : "black" }}
            >
              {userInfo.displayName}님의 작품입니다!
            </div>
          </InnerText>
          <InnerBox style={{ padding: "0", gap: "0" }}>
            {/* Works 내용 */}
            {myProjectList.map((item, index) => {
              const [imgHover, setimgHover] = useState(false);

              return (
                <PjtImg
                  onClick={() => (
                    dispatch(setMyCurrentProject(item)),
                    navigate(`/TeamSpaceDetailPage/${item.projectId}`)
                  )}
                  className={imgHover ? "shadow" : ""}
                  onHoverStart={() => setimgHover(true)}
                  onHoverEnd={() => setimgHover(false)}
                  // whileHover={{ opacity: 0.8 }}
                  style={{ cursor: "pointer" }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={index}
                  src={item.projectImg}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.3 }}
                />
              );
            })}
            {myProjectList.length == 0 && (
              <div
                style={{
                  padding: "1rem",
                  fontSize: "1.2rem",
                  color: isDark ? "white" : "black",
                }}
              >
                아직 작업물이 없습니다. 시나브로와 함께해요!
              </div>
            )}
          </InnerBox>
        </InnerArea>
        <InnerArea>
          <InnerText>Memory Graph</InnerText>
          <div>이거 설명</div>
          <MemoryGraphContainer>
            <MemoryGraphMainBox
            // onClick={() => setIsSidePanelVisible(!isSideBoxVisible)}
            >
              <MemoryGraph />
            </MemoryGraphMainBox>
            {isSideBoxVisible && (
              <MemoryGraphSideBox>
                <MemoryGraphDescribeBox
                  style={{ color: isDark ? "white" : "black" }}
                >
                  <h1>제목</h1>
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용 내용내용내용내용내용내용
                  내용내용내용내용내용내용
                </MemoryGraphDescribeBox>
                <MemoryGraphButtonBox>
                  <MemoryGraphButton onClick={handleShow}>
                    Add Node
                  </MemoryGraphButton>
                  <MemoryGraphButton onClick={handleShow}>
                    Edit
                  </MemoryGraphButton>
                </MemoryGraphButtonBox>
              </MemoryGraphSideBox>
            )}
          </MemoryGraphContainer>
        </InnerArea>
        {/* 아래부분 모달 코드이므로 추후에 수정 필요 */}
        {showModal && (
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>나중에</Modal.Title>
            </Modal.Header>
            <Modal.Body>수정할게요</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
              <Button variant="primary" onClick={handleClose}>
                저장
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </MyPageMainPanelContainer>
    </div>
  );
};

export default MyPageMainPanel;
