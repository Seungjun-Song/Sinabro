import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GlobalColor } from "../../services/color";
import { useSelector } from "react-redux";
import axios from "axios";
import getEnv from "../../utils/getEnv";

const TSDProjectInfo = ({isIn,setIsIn, whatInfo, setWhatInfo, isDark }) => {
  const back_url = getEnv("BACK_URL");
  const list = ["설명", "팀원", "일정", "소나큐브"];

  const myCurrentProject = useSelector((state) => state.myCurrentProject.value);
  const userInfo = useSelector((state) => state.user.currentUser);
  const [teamInfo, setTeamInfo] = useState([]);
  // console.log(userInfo);
  // console.log(myCurrentProject);
  const isTeam = (data) => {  
    // console.log(data);
    if (data) {
      const isUserInTeam = data.some(
        (teammate) => teammate.memberId === userInfo.uid
      );
      setIsIn(isUserInTeam);
    }
  };

  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const res = await axios.get(
          `${back_url}/teams?projectId=${myCurrentProject.projectId}`
        );
        isTeam(res.data.result.teammateInfoList);
      } catch (err) {
        console.error(err);
      }
    };
    getProjectInfo();
  }, [myCurrentProject]);
  return (
    <AnimatePresence>
      <motion.div
        className="col-2"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
          paddingRight: "2rem",
          
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.1, // 순차적으로 애니메이션 적용
              // duration:0.3
            },
          },
          hidden: { opacity: 0 },
        }}
      >
        {list.map((item, index) => {
          // "소나큐브" 항목이면서 isIn이 false인 경우 렌더링하지 않음
          // if (item === "소나큐브" && !isIn) {
          //   return null;
          // }

          return (
            <motion.div
              key={index} // 각 요소에 고유한 키를 할당합니다.
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -50 },
              }}
              onClick={() => setWhatInfo(item)}
              whileHover={{
                cursor: "pointer",
                y: -5,
                backgroundColor: "#564CAD",
                border: "3px solid #564CAD",
                color: "white",
              }}
              className="py-2 shadow"
              style={{
                fontSize: "1.2rem",
                borderRadius: "0.5rem",
                textAlign: "center",
                backgroundColor: isDark
                  ? GlobalColor.colors.primary_black50
                  : "#F5F8FF",
                border:
                  whatInfo === item ? "3px solid #564CAD" : "3px solid #F5F8FF",
                color: isDark ? "white" : "black",
                display: item == "소나큐브" && !isIn ? "none" : "",
              }}
            >
              {item}
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default TSDProjectInfo;
