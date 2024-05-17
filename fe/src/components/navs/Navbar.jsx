import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import DropTeam from "./DropTeam";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "/public/image/nav/sinabro_logo.png";
import Sinabro from "/image/nav/Sinabro.png";
import DropDawnIcon from "/image/nav/dropdownIcon.png";
import Sinabro_blue from "/image/nav/Sinabro_blue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toggleisDarkState } from "../../store/isDarkSlice";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { GlobalColor } from "../../services/color";
import getEnv from "../../utils/getEnv";

import { clearUser } from "./../../store/userSlice";
import axios from "axios";
const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 800px;
  height: 100px;
  background-color: ${({ isScrolled }) =>
    !isScrolled ? "rgba(86, 76, 173, 1)" : "rgba(245, 248, 255, 1)"};

  z-index: 999;
  position: fixed;
  top: 0;
  transition: 0.5s; /* 부드러운 애니메이션을 위한 transition 설정 */
  color: ${({ isScrolled }) => (!isScrolled ? "white" : GlobalColor.colors.primary_black)};

  font-size: 1.1rem;
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
  gap: 1rem;
  cursor: pointer;

  /* color: white; */
`;

const Community = styled.div`
  /* color: white; */
  cursor: pointer;
`;

const MyPage = styled.div`
  /* color: white; */
  cursor: pointer;
`;

const Log = styled.div`
  /* color: white; */
  cursor: pointer;
`;

const DropDownButton = styled.div`
  cursor: pointer;
  transition: transform 0.3 ease;
    &:hover{
        transform: scale(1.2)
    }
`;

const DropDownPage = styled.div`
  position: absolute; /* 절대 위치 지정 */
  z-index: 999;
  top: 70%;
  left: 9.5%;
`;

const LeftNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  gap: 2rem;
  margin-left: 1%;

`;

const RightNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  margin-right: 3%;
`;

const Logos = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
`;

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태를 저장할 상태
  const isDark = useSelector(state => state.isDark.isDark)
  const user = useSelector(state => (state.user.currentUser))

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const toggleDarkMode = () => {
    dispatch(toggleisDarkState())
  };


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
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const logout = () => {
    const back_url = getEnv('BACK_URL')

    dispatch(clearUser());
    axios.delete(`${back_url}/oauth2`)
    .then((res) =>{
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <NavBar isScrolled={isScrolled}>
      <LeftNavContainer>
        <Logos
          onClick={() => navigate('/mainPage')}
        >
          <LogoImage isScrolled={isScrolled} src={Logo} />
          {!isScrolled ? (
            <SinabroImg src={Sinabro} />
          ) : (
            <SinabroImg src={Sinabro_blue} />
          )}
        </Logos>

        <DropDown
          onClick={() => {
            setDropDown(!dropDown);
          }}
        >
          <div style={{ fontFamily: "Jamsil Light" }}>팀 스페이스</div>
          <DropDownButton>
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
                  style={{ borderRadius: "0.5rem" }}
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

        <Community style={{ fontFamily: "Jamsil Light", marginLeft: '1rem', minWidth: '4.5rem' }}
        onClick={() => navigate('/communityMainPage', { state: { kind: {id: 401, name: "member"}, page: 1 } })}
      >커뮤니티</Community>
      </LeftNavContainer>
      <RightNavContainer>
        <MyPage style={{ fontFamily: "Jamsil Light", minWidth: '4.8rem' }}
          onClick={() => navigate('/mypage')}
        >마이페이지</MyPage>

        <Log style={{ fontFamily: "Jamsil Light", minWidth: '4.5rem' }}
          onClick={() => logout()}
        >로그아웃</Log>

        {/* <DarkModeSwitch
          style={{}}
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={25}
          sunColor="white"
          moonColor="white"
        /> */}
        <div className="switch" style={{ border: "solid 2px" }} data-isOn={isDark} onClick={toggleDarkMode}>
          <motion.div className="handle" layout onClick={toggleDarkMode} >
            <DarkModeSwitch
              style={{}}
              checked={isDark}
              onChange={toggleDarkMode}
              size={18}
              sunColor=" rgb(81, 81, 81)"
              moonColor="white"
            />
          </motion.div>
        </div>
      </RightNavContainer>
    </NavBar>
  );
};

export default Navbar;
