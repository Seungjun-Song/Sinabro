import axios from "axios";
import GotoTeamSpace from "../components/Mainpage/GotoTeamSpace";
import SinabroTeamProject from "../components/Mainpage/SinabroTeamProject";
import SimpleSlider from "../components/Mainpage/Slider";
import VerticalSlider from "../components/Mainpage/VerticalSlider";
import UserChat from "../components/Userchat/UserChat";

import Navbar from "../components/navs/Navbar";
import data from "./data";
// import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { GlobalColor } from "../services/color";

const Mainpage = () => {
  const isDark = true
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

  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(new URL(currentUrl).search);

  // accessToken 값을 가져오기
  const accessToken = urlParams.get("accessToken");
  console.log(accessToken); // 예: "37173713"
  return (
    <>
      <Navbar />
      <motion.div
        className="d-flex"
        initial={{ opacity: 0 }} // 초기 상태에서 opacity를 0으로 설정
        animate={{ opacity: 1 }} // 나타날 때 opacity를 1로 설정
        exit={{ opacity: 0 }} // 사라질 때 opacity를 0으로 설정
        style={{
          width: "100vw",

          // alignItems: "center",
          paddingTop: "80px",
          justifyContent: "center",
          backgroundColor: isDark ? GlobalColor.colors.primary_black: "white",
        }}
      >
        <div style={{ width: "70%" }}>
          <SimpleSlider />
          <VerticalSlider isDark={isDark} />
          <GotoTeamSpace isDark={isDark} data={data} activeSlide={2} />
          <SinabroTeamProject isDark={isDark} />
        </div>
      </motion.div>
      <UserChat />
    </>
  );
};

export default Mainpage;
