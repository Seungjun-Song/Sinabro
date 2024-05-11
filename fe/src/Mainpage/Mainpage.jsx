import axios from "axios";
import GotoTeamSpace from "../components/Mainpage/GotoTeamSpace";
import SinabroTeamProject from "../components/Mainpage/SinabroTeamProject";
import SimpleSlider from "../components/Mainpage/Slider";
import VerticalSlider from "../components/Mainpage/VerticalSlider";
import UserChat from "../components/Userchat/UserChat";

import Navbar from "../components/navs/Navbar";
import data from "./data";
// import "./styles.css";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GlobalColor } from "../services/color";
import { useDispatch, useSelector } from "react-redux";
import getEnv from "../utils/getEnv";
import { setMyProjectList } from "../store/myProjectListSlice";

const Mainpage = () => {
  const isDark = useSelector((state) => state.isDark.isDark);
  const userInfo = useSelector((state) => state.user.currentUser);
  const back_url = getEnv("BACK_URL");
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [allPage, setAllPage] = useState([]);
  const [isNext, setIsNext] = useState(true);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const res = await axios.get(`${back_url}/members/projects`, {
          withCredentials: true,
        });
        dispatch(setMyProjectList(res.data.result));
      } catch (err) {
        console.error(err);
      }
    };
    getMyProjects();
  }, []);
  const getAllProjects = async (newpage) => {
    try {
      const res = await axios.get(`${back_url}/teams/projects/${newpage}`, {
        withCredentials: true,
      });
      setAllPage([...allPage, ...res.data.result.projectListResponseDtos]);
      setIsNext(res.data.result.hasNext);
      console.log(isNext);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllProjects(0);
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition =
  //       window.scrollY ||
  //       window.pageYOffset ||
  //       document.documentElement.scrollTop;

  //     const windowHeight = window.innerHeight;
  //     const fullHeight = document.body.scrollHeight;

  //     if (scrollPosition >= fullHeight - windowHeight) {
  //       console.log("바닥")
  //       if (isNext) {
  //         console.log("page+1")
  //         setPage((prev) => prev + 1);
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isNext]);
  const handleClick = async () => {
    if (isNext) {
      await getAllProjects(page + 1);
      setPage((prev) => prev + 1);

      // 1초 후에 페이지의 바닥으로 스크롤 이동
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth", // 부드러운 스크롤 효과 적용
        });
      }, 10); // 1000ms = 1초
    }
  };
  const myProjectList = useSelector((state) => state.myProjectList.value); // 잘 들어오는지 확인, 페이지 이동 잘 되는지 확인
  return (
    <>
      <Navbar />
      {/* {console.log(userInfo)} */}
      <motion.div
        className="d-flex"
        initial={{ opacity: 0 }} // 초기 상태에서 opacity를 0으로 설정
        animate={{ opacity: 1 }} // 나타날 때 opacity를 1로 설정
        exit={{ opacity: 0 }} // 사라질 때 opacity를 0으로 설정
        style={{
          width: "100vw",
          transition: "0.3s",
          // alignItems: "center",
          paddingTop: "80px",
          justifyContent: "center",
          backgroundColor: isDark ? GlobalColor.colors.primary_black : "white",
        }}
      >
        <div style={{ width: "70%" }}>
          <SimpleSlider />
          <VerticalSlider isDark={isDark} />
          <GotoTeamSpace
            isDark={isDark}
            data={myProjectList}
            activeSlide={Math.min(Math.floor(myProjectList && myProjectList.length > 0 ? myProjectList.length : 0 / 2), 2)}
          />
          <SinabroTeamProject
            allPage={allPage}
            setPage={setPage}
            isDark={isDark}
          />

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <AnimatePresence>
              {isNext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleClick()}
                  className="shadow"
                  style={{
                    cursor: "pointer",
                    padding: " 0.75rem 2rem",
                    marginBottom: "1rem",
                    // height: "5rem",
                    // width: "10rem",
                    display: "flex",
                    // border: "3px solid black",
                    borderRadius: "0.8rem",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(86, 76, 173)",
                    color: "white",
                    gap: "1rem",
                    fontSize: "0.8rem",
                  }}
                >
                  더보기
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <UserChat />
      {/* <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      /> */}
    </>
  );
};

export default Mainpage;
