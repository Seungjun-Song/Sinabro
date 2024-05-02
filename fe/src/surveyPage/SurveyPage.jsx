import React, { useState } from "react";
import styled from "styled-components";
import SkillBox from "./SkillBox";
import Navbar from "../components/navs/Navbar";
import {
  faCircleChevronLeft,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
const SurveyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/images/survey_background.png");
  background-size: cover;
  background-position: center;
`;

const SurveyBox = styled.div`
  width: 640px;
  height: 400px;
  border: 3px solid #9aa5de;
  border-radius: 10px;
  box-shadow: 0px 5px 5px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: relative;
`;

const Title = styled.div`
  height: 20%;
  font-weight: bold;
  font-size: 2.5rem;
  color: #204fcf;
  margin-top: 5%;
`;

const Subtitle = styled.div`
  height: 10%;
  font-weight: bold;
`;

const SkillContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 40%;
`;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  width: 80%;
  height: 50%;
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

const SearchContainerLeftSide = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
`;

const SearchContainerRightSide = styled.div`
  height: 100%;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkillDetail = styled.div`
  background-color: #f2f2f2;
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

const SkillDelBtn = styled.div`
  color: #39a0ba;
  font-weight: bold;
  cursor: pointer;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #613acd;
  cursor: pointer;
  margin-left: auto;
  align-self: center;
`;

const SendButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 25%;
`;

const SendButton = styled(motion.span)`
  padding: 0.7rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  background-color: #566cdd;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  box-shadow: 0px 2px 2px black;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
const dataList = [
  {
    name: "React",
    img: "/images/react.png",
  },
  {
    name: "Vue",
    img: "/images/vue.png",
  },
  {
    name: "HTML",
    img: "/images/html.png",
  },
  {
    name: "CSS",
    img: "/images/css.png",
  },
  {
    name: "JavaScript",
    img: "/images/js.png",
  },
  {
    name: "Java",
    img: "/images/java.png",
  },
  {
    name: "Python",
    img: "/images/python.png",
  },
  {
    name: "Spring",
    img: "/images/spring.png",
  },
  {
    name: "Django",
    img: "/images/django.png",
  },
];
const SurveyPage = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [isFeSelected, setFeIsSelected] = useState(false);
  const [isBeSelected, setBeIsSelected] = useState(false);
  const [isFullSelected, setFullIsSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [whatSearch, setWhatSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [choiceResults, setChoiceResults] = useState([]);
  const selectFeSkill = () => {
    if (!isSelected) {
      setIsSelected(!isSelected);
      setFeIsSelected(!isFeSelected);
    } else {
      if (isFeSelected) {
        setIsSelected(!isSelected);
        setFeIsSelected(!isFeSelected);
      }
    }
  };

  const selectBeSkill = () => {
    if (!isSelected) {
      setIsSelected(!isSelected);
      setBeIsSelected(!isBeSelected);
    } else {
      if (isBeSelected) {
        setIsSelected(!isSelected);
        setBeIsSelected(!isBeSelected);
      }
    }
  };

  const selectFullSkill = () => {
    if (!isSelected) {
      setIsSelected(!isSelected);
      setFullIsSelected(!isFullSelected);
    } else {
      if (isFullSelected) {
        setIsSelected(!isSelected);
        setFullIsSelected(!isFullSelected);
      }
    }
  };

  const handleChange = (event) => {
    setWhatSearch(event.target.value);
    // 입력된 검색어에 따라 결과 필터링
    const filteredResults = dataList.filter((item) => {
      // 만약 item.name이 choiceResults에 포함되어 있지 않고, 검색어에 포함되어 있다면 true를 반환합니다.
      return (
        !choiceResults.some((choiceItem) => choiceItem.name === item.name) &&
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    console.log(filteredResults); // 필터링된 결과를 console에 출력
    setSearchResults(filteredResults);
  };
  const handleDelete = (item) => {
    // choiceResults에서 item.name과 같은 항목을 제외한 나머지를 새로운 배열로 만듭니다.
    const updatedResults = choiceResults.filter(
      (choiceItem) => choiceItem.name !== item.name
    );
    // choiceResults 상태를 새로운 배열로 업데이트합니다.
    setChoiceResults(updatedResults);
  };

  return (
    <>
      <Navbar></Navbar>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
      >
        <SurveyContainer>
          <SurveyBox>
            {isChecked && (
              <motion.div
                whileHover={{ x: -5, cursor: "pointer", color: "#564CAD" }}
                onClick={() => (
                  setIsChecked(false),
                  setIsSelected(false),
                  setFeIsSelected(false),
                  setBeIsSelected(false),
                  setFullIsSelected(false),
                  setChoiceResults([])
                )}
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  color: "#a7a7a7",
                }}
              >
                <FontAwesomeIcon size="lg" icon={faCircleChevronLeft} />
              </motion.div>
            )}
            <Title>
              <p>기술 스택</p>
            </Title>
            {!isChecked === true ? (
              <>
                <Subtitle>
                  <p>자신이 개발할 분야를 선택해주세요!</p>
                </Subtitle>
                <SkillContainer
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <div onClick={selectFeSkill}>
                    <SkillBox
                      iconName="computer"
                      borderColor="#3DC7AE"
                      text="프론트 엔드"
                      checked={isFeSelected}
                    />
                  </div>
                  <div onClick={selectBeSkill}>
                    <SkillBox
                      iconName="gear"
                      borderColor="#315DCC"
                      text="백 엔드"
                      checked={isBeSelected}
                    />
                  </div>
                  <div onClick={selectFullSkill}>
                    <SkillBox
                      iconName="leaf"
                      borderColor="#6C31CC"
                      text="풀 스택"
                      checked={isFullSelected}
                    />
                  </div>
                </SkillContainer>
                <SendButtonContainer>
                  <AnimatePresence>
                    {isSelected && (
                      <SendButton
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsChecked(true)}
                      >
                        다음
                      </SendButton>
                    )}
                  </AnimatePresence>
                </SendButtonContainer>
              </>
            ) : (
              <>
                <Subtitle>
                  <p>자신이 가진 기술 스택을 입력해주세요!</p>
                </Subtitle>
                <MainContainer>
                  <SearchContainer
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    <SearchContainerLeftSide>
                      <AnimatePresence>
                        {choiceResults.map((item) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                          >
                            {" "}
                            <SkillDetail>
                              {/* {없을 때 띄울 글자 생각해야함} */}
                              {item.name}
                              <SkillDelBtn onClick={() => handleDelete(item)}>
                                X
                              </SkillDelBtn>
                            </SkillDetail>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <SearchInput onChange={handleChange} value={whatSearch} />
                    </SearchContainerLeftSide>
                    <SearchContainerRightSide>
                      <SearchIcon icon={faSearch} />
                    </SearchContainerRightSide>
                  </SearchContainer>
                  {whatSearch && (
                    <div
                      className="shadow"
                      style={{
                        maxHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        overflowY: "auto",
                        borderRadius: "0rem 0rem 0.4rem 0.4rem",
                      }}
                    >
                      {searchResults.map((result, index) => (
                        <motion.div
                          onClick={() => (
                            setChoiceResults([...choiceResults, result]),
                            setWhatSearch("")
                          )}
                          transition={{ duration: 0.3 }}
                          whileHover={{
                            cursor: "pointer",
                            backgroundColor: "#909EE790",
                            color: "white",
                          }}
                          style={{
                            display: "flex",
                            gap: "0.8rem",
                            alignItems: "center",
                            padding: "0 1rem",
                            height: "1.3rem",
                            fontSize: "1rem",
                            backgroundColor: "white",
                          }}
                          key={index}
                        >
                          {result.name}
                          <img style={{ height: "1.2rem" }} src={result.img} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </MainContainer>
                <SendButtonContainer>
                  <SendButton>완료</SendButton>
                </SendButtonContainer>
              </>
            )}
          </SurveyBox>
        </SurveyContainer>
      </motion.div>
    </>
  );
};

export default SurveyPage;
