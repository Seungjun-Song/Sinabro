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
import { useEffect } from "react";
import { GlobalColor } from "../services/color";
import { useDispatch, useSelector } from "react-redux";
import getEnv from "../utils/getEnv";
import { setMyProjectList } from "../store/myProjectListSlice";

const Mainpage = () => {
  const isDark = useSelector((state) => state.isDark.isDark);
  const userInfo = useSelector((state) => state.user.currentUser);
  const isPresent = useIsPresent();
  // const api = "192.168.30.194:8080";
  // useEffect(() => {
  //   axios
  //     .get(`${api}/api/login`)
  //     .then((response) => {
  //       // 요청이 성공했을 때 실행되는 코드
  //       console.log(response.data); // 응답 데이터
  //     })
  //     .catch((error) => {
  //       // 요청이 실패했을 때 실행되는 코드
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // const currentUrl = window.location.href;
  // const urlParams = new URLSearchParams(new URL(currentUrl).search);

  // // accessToken 값을 가져오기
  // const accessToken = urlParams.get("accessToken");
  // console.log(accessToken); // 예: "37173713"

  const back_url = getEnv("BACK_URL");
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyProjects = async () => {
      // 작동하는지 확인
      try {
        const res = await axios.get(`${back_url}/members/projects`, {withCredentials: true})
        console.log(res.data.result)
        dispatch(setMyProjectList(res.data.result))
      } catch (err) {
        console.error(err);
      }
    };
    getMyProjects();
  }, []);
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
            activeSlide={Math.min(Math.floor(data.length / 2), 2)}
          />
          <SinabroTeamProject isDark={isDark} />
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
