import GotoTeamSpace from "../components/Mainpage/GotoTeamSpace";
import SinabroTeamProject from "../components/Mainpage/SinabroTeamProject";
import SimpleSlider from "../components/Mainpage/Slider";
import VerticalSlider from "../components/Mainpage/VerticalSlider";
import UserChat from "../components/Userchat/UserChat";

import Navbar from "../components/navs/Navbar";
import data from "./data";
// import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";
const Mainpage = () => {
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
          // backgroundColor: "rgba(212, 223, 255, 0.2)",
        }}
      >
        <div style={{ width: "70%" }}>
          <SimpleSlider />
          <VerticalSlider />
          <GotoTeamSpace data={data} activeSlide={2} />
          <SinabroTeamProject />
        </div>
      </motion.div>
      <UserChat/>
    </>
  );
};

export default Mainpage;
