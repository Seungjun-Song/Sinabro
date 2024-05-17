import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  faCircleInfo,
  faCircleXmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
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
  overflow-x: none;
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
  width: 23%;
  padding: 1.2rem;
  margin-right: 10px;
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
  position: relative;
`;
const MemoryGraphDescribeBox = styled.div`
  border: 3px solid transparent;
  border-image: linear-gradient(to right, #3dc7af, #613acd);
  border-image-slice: 1;
  margin-left: 1rem;
  width: 198px;
  padding: 1rem;
  /* max-height: 26rem; */
  height: 100%;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const MemoryGraphButtonBox = styled.div`
  margin-left: 1rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const MemoryGraphButton = styled.div`
  font-size: 0.75rem;
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
  const [whatnode, setWhatNode] = useState(null);
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

  // 메모리 그래프 구역
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const [color, setColor] = useState("#c7c7c7");

  const [newnode, setNewNode] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [content, setContent] = useState(" ");
  const fgRef = useRef();
  const getGraphData = async () => {
    try {
      const res = await axios.get(`${back_url}/memo`);
      const memberList = res.data.result;
      console.log(memberList);

      setGraphData({ nodes: memberList.nodeList, links: memberList.linkList });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const changenode = async () => {
    if (newnode == "") {
      return;
    } else if (content == "") {
      return;
    }
    console.log(newnode);
    console.log(content);
    try {
      const res = await axios.put(`${back_url}/memo/update`, {
        memoId: whatnode.id,
        title: newnode,
        content: content,
        color: color,
      });
      console.log(res);
      setIsModal(false);
      setWhatNode(null);
      setContent("");
      setNewNode("");
      setColor("#c7c7c7");
      await getGraphData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getGraphData();
  }, []);

  //   const gData = genRandomTree();
  //   console.log(gData);
  const addnode = async () => {
    console.log(newnode);
    console.log(content);
    console.log(color);
    if (newnode == "") {
      return;
    } else if (content == "") {
      return;
    }
    try {
      const res = await axios.post(
        `${back_url}/memo`,
        {
          title: newnode, // newnode 변수를 제목으로 사용
          content: content, // content 변수를 내용으로 사용
          color: color,
        },
        { withCredentials: true }
      );
      return res.data.result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const connectnode = async (newnodeid) => {
    try {
      const res = await axios.put(
        `${back_url}/memo?memoId1=${whatnode.id}&memoId2=${newnodeid}`,
        { withCredentials: true }
      );
      console.log(res);
      await getGraphData();
      const distance = 500;
      const distRatio =
        1 + distance / Math.hypot(whatnode.x, whatnode.y, whatnode.z);
      console.log(fgRef.current);
      fgRef.current.cameraPosition(
        {
          x: whatnode.x * distRatio,
          y: whatnode.y * distRatio,
          z: whatnode.z * distRatio,
        }, // new position
        whatnode, // lookAt ({ x, y, z })
        1500 // ms transition duration
      );
      setIsModal(false);
      setWhatNode(null);
      setContent("");
      setNewNode("");
      setColor("#c7c7c7");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hadleAllClick = (node) => {
    // Aim at node from outside it
    setWhatNode(node);
    console.log(node);
    const distance = 500;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
    if (graphData.nodes.length !== 0) {
      fgRef.current.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        }, // new position
        node, // lookAt ({ x, y, z })
        1500 // ms transition duration
      );
    }
    //   fgRef = 0;
  };
  //   console.log(color);
  const handleNodeDel = async () => {
    // 경고 창을 통해 사용자에게 확인 메시지를 표시
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    // 사용자가 확인을 선택한 경우에만 삭제 진행
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${back_url}/memo?memoId=${whatnode.id}`,
          {
            withCredentials: true,
          }
        );
        // 삭제 성공
        setIsModal(false);
        setWhatNode(null);
        setContent("");
        setNewNode("");
        setColor("#c7c7c7");
        await getGraphData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleConfirm = async () => {
    const newnodeid = await addnode();
    connectnode(newnodeid);
  };
  const handlefirst = async () => {
    await addnode();
    getGraphData();
  };
  const [isinfoHover, setIsInfoHover] = useState(false);
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
                height: "4rem",
                alignItems: "center",
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
                  style={{ cursor: "pointer", borderRadius: "30px" }}
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
          <InnerText
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div>Memory Graph</div>
              <div
                style={{ fontSize: "1rem", color: isDark ? "white" : "black" }}
              >
                <div>노드간 정보를 입체적으로 저장하세요</div>
              </div>
            </div>
            <motion.div style={{ marginRight: "2rem", position: "relative" }}>
              <FontAwesomeIcon
                onClick={() => setIsInfoHover(!isinfoHover)}
                size="2xs"
                style={{ color: "rgba(86, 76, 173, 1)", cursor: "pointer" }}
                // flip="horizontal"
                icon={faCircleInfo}
              />
              <AnimatePresence>
                {isinfoHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                    className="shadow"
                    style={{
                      zIndex: "99",
                      width: "28rem",
                      position: "absolute",
                      top: "-1.1rem",
                      right: "2rem",
                      backgroundColor: "White",
                      borderRadius: "1rem",
                      padding: "1rem",
                      color: "black",
                      fontSize: "1rem",
                    }}
                  >
                    <div>파란색 +버튼 : 독립적으로 존재하는 노드 생성</div>
                    <div>
                      노드 클릭시 나오는 Add Node : 그 노드와 연결된 노드 생성
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </InnerText>
          <MemoryGraphContainer>
            <MemoryGraphMainBox
            // onClick={() => setIsSidePanelVisible(!isSideBoxVisible)}
            >
              <MemoryGraph
                newnode={newnode}
                setNewNode={setNewNode}
                setColor={setColor}
                whatnode={whatnode}
                setWhatNode={setWhatNode}
                setGraphData={setGraphData}
                graphData={graphData}
                color={color}
                isModal={isModal}
                setIsModal={setIsModal}
                content={content}
                setContent={setContent}
                fgRef={fgRef}
                handlefirst={handlefirst}
                handleConfirm={handleConfirm}
                changenode={changenode}
                isDark={isDark}
                hadleAllClick={hadleAllClick}
                getGraphData={getGraphData}
                addnode={addnode}
              />
            </MemoryGraphMainBox>
            {whatnode && (
              <MemoryGraphSideBox>
                <MemoryGraphDescribeBox
                  style={{ color: isDark ? "white" : "black" }}
                >
                  <h3>{whatnode.label}</h3>
                  {whatnode.content}
                </MemoryGraphDescribeBox>
                <MemoryGraphButtonBox>
                  <MemoryGraphButton
                    onClick={() => (
                      setIsModal({ type: "add" }), console.log(isModal)
                    )}
                  >
                    Add Node
                  </MemoryGraphButton>
                  <MemoryGraphButton
                    onClick={() => (
                      setIsModal({ type: "change" }),
                      setColor(whatnode.color),
                      setContent(whatnode.content),
                      setNewNode(whatnode.label),
                      console.log(isModal)
                    )}
                  >
                    Edit
                  </MemoryGraphButton>
                  <MemoryGraphButton onClick={() => handleNodeDel()}>
                    Del
                  </MemoryGraphButton>
                </MemoryGraphButtonBox>
                <div
                  onClick={() => setWhatNode(null)}
                  style={{
                    position: "absolute",
                    top: "0",
                    right: 0,
                    cursor: "pointer",
                    color: "rgb(86, 76, 173)",
                  }}
                >
                  <FontAwesomeIcon size="xl" icon={faCircleXmark} />
                </div>
              </MemoryGraphSideBox>
            )}
          </MemoryGraphContainer>
        </InnerArea>
        {/* 아래부분 모달 코드이므로 추후에 수정 필요 */}
        {/* {showModal && (
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
        )} */}
      </MyPageMainPanelContainer>
    </div>
  );
};

export default MyPageMainPanel;
