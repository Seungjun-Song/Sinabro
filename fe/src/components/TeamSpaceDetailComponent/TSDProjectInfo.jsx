import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlobalColor } from "../../services/color";

const TSDProjectInfo = ({ whatInfo, setWhatInfo,isDark }) => {
  const list = ["설명", "팀원", "일정"];

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
        {list.map((item, index) => (
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
              // transition:"0.3s",
              fontSize: "1.2rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              backgroundColor:isDark ? GlobalColor.colors.primary_black50 :  "#F5F8FF",
              border:
                whatInfo === item ? "3px solid #564CAD" : "3px solid #F5F8FF",
              color : isDark ? "white" :  "black"
            }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default TSDProjectInfo;
