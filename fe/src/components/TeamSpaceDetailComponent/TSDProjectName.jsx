import React, { useEffect } from "react";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProjectRoomId } from "../../store/projectRoomIdSlice";
import axios from "axios";
import getEnv from "../../utils/getEnv";

const TSDProjectName = ({ isDark }) => {
  const [isHover, setIsHover] = useState(false);
  const [projectSartDate, setProjectStartDate] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myCurrentProject = useSelector((state) => state.myCurrentProject.value);
  // console.log(myCurrentProject)

  const back_url = getEnv('BACK_URL')

  const formatProjectStartDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/. /g, '.').replace('.', '');
  
    console.log(formattedDate); // 출력: 2024.05.09
    // 프로젝트 시작 날짜를 설정하는 로직을 여기에 추가합니다.
  };

  useEffect(() => {
    const getTeamInfo = async () => {
      try {
        const res = await axios.get(`${back_url}/teams?projectId=${myCurrentProject.projectId}`)
        // console.log(res.data.result)
        setProjectStartDate(formatProjectStartDate(res.data.result.createdDttm))
      }
      catch (err) {
        console.error(err)
      }
    }
    getTeamInfo()
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        style={{
          display: "flex",
          width: "70%",
          justifyContent: "space-between",
          padding: "2rem",
          alignItems: "end",
          borderBottom: "3px solid transparent", // 투명한 테두리 설정
          borderImage: "linear-gradient(to right, #a8c0ff, #3f2b96 )", // 그라데이션 테두리 이미지
          borderImageSlice: "1", // 이미지 슬라이스
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <img
            className="shadow"
            style={{ width: "8rem", borderRadius: "20px" }}
            src={myCurrentProject?.projectImg}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              color: isDark ? "white" : "black",
            }}
          >
            <h5 style={{ margin: 0 }}>프로젝트 명</h5>
            <h3 style={{ fontWeight: "bold", margin: 0 }}>
              {myCurrentProject?.projectName}
            </h3>
            <p>{projectSartDate}</p>
          </div>
        </div>
        <motion.div
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          onClick={() => {
            dispatch(setProjectRoomId(myCurrentProject?.projectId)),
              navigate(`/project/${myCurrentProject?.projectId}`);
          }}
          whileHover={{
            cursor: "pointer",
            backgroundColor: "#304895",
            color: "white",
            x: 7,
          }}
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            padding: "1rem",
            border: "solid 3px #304895",
            borderRadius: "1rem",
            justifyContent: "center",
            color: isDark ? "white" : "black",
          }}
        >
          프로젝트로 이동
          {/* <img style={{width:"1.3rem" ,height:"1.3rem" }}  src="/images/right.png" /> */}
          <motion.div>
            <FontAwesomeIcon
              icon={faCircleRight}
              size="lg"
              color={isHover ? "white" : "#304895"}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TSDProjectName;
