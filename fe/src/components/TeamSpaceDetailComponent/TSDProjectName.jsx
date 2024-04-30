import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
const TSDProjectName = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <motion.div
        initial={{opacity:0 , y:10}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,y:10}}
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
            style={{ width: "8rem" }}
            src="/images/pjtimg.png"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h5 style={{margin:0}}>프로젝트 명</h5>
            <h3 style={{ fontWeight: "bold" ,margin:0}}>GRABBERS</h3>
          </div>
        </div>
        <motion.div
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          whileHover={{
            cursor: "pointer",
            backgroundColor: "#304895",
            color: "white",
            x:7
          }}
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            padding: "1rem",
            border: "solid 3px #304895",
            borderRadius: "1rem",
            justifyContent: "center",
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
