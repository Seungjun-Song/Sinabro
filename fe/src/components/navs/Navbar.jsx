import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DropTeam from "./DropTeam";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "/public/image/nav/sinabro_logo.png";
import Sinabro from "/image/nav/Sinabro.png";
import DropDawnIcon from "/image/nav/dropdownIcon.png";
import Sinabro_blue from "/image/nav/Sinabro_blue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background-color: ${({ isScrolled }) =>
    !isScrolled ? "rgba(86, 76, 173, 1)" : "rgba(245, 248, 255, 1)"};

  z-index: 999;
  position: fixed;
  top: 0;
  transition: 0.5s; /* 부드러운 애니메이션을 위한 transition 설정 */
  color: ${({ isScrolled }) => (!isScrolled ? "white" : "black")};
`;

const LogoImage = styled.img`
  height: 3.5rem;
  border: 2px solid
    ${({ isScrolled }) => (!isScrolled ? "white" : "rgba(86, 76, 173, 1)")};
  border-radius: 50%;
  margin: 1rem;
`;

const SinabroImg = styled.img`
  height: 1.3rem;
`;

const DropDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  /* color: white; */
`;

const Community = styled.div`
  /* color: white; */
`;

const MyPage = styled.div`
  /* color: white; */
`;

const Log = styled.div`
  /* color: white; */
`;

const DropDownButton = styled.div``;

const DropDownPage = styled.div`
  position: absolute; /* 절대 위치 지정 */
  z-index: 999;
  top: 70%;
  left: 8%;
`;

const LeftNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 25%;

  margin-left: 1%;
`;

const RightNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 10%;

  margin-right: 3%;
`;

const Logos = styled.div``;

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태를 저장할 상태
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset; // 현재 스크롤 위치를 가져옴
      setIsScrolled(scrollTop > 0); // 스크롤이 발생한 경우 true, 그렇지 않으면 false로 설정
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 등록

    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    };
  }, []);
  return (
    <NavBar isScrolled={isScrolled}>
      <LeftNavContainer>
        <Logos>
          <LogoImage isScrolled={isScrolled} src={Logo} />
          {!isScrolled ? (
            <SinabroImg src={Sinabro} />
          ) : (
            <SinabroImg src={Sinabro_blue} />
          )}
        </Logos>

        <DropDown>
          <div style={{ fontFamily: "Jamsil Light" }}>팀 스페이스</div>
          <DropDownButton
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            <motion.div
              transition={{ duration: 0.3 }}
              animate={{ rotate: dropDown ? 180 : 0 }}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </motion.div>
          </DropDownButton>
          <DropDownPage>
            <AnimatePresence>
              {dropDown && (
                <motion.div
                className="shadow"
                style={{borderRadius:"0.5rem"}}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 10 },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <DropTeam />
                </motion.div>
              )}
            </AnimatePresence>
          </DropDownPage>
        </DropDown>

        <Community style={{ fontFamily: "Jamsil Light" }}>커뮤니티</Community>
      </LeftNavContainer>

      <RightNavContainer>
        <MyPage style={{ fontFamily: "Jamsil Light" }}>마이페이지</MyPage>

        <Log style={{ fontFamily: "Jamsil Light" }}>로그아웃</Log>
      </RightNavContainer>
    </NavBar>
  );
};

export default Navbar;
