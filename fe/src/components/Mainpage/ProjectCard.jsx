import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlobalColor } from "../../services/color";
const ProjectCard = ({ item ,isDark}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",
          width: "17rem",
          
        }}
      >
        <motion.div
          whileHover={{ cursor: "pointer" }}
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          className="shadow"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            borderRadius: "1rem",
            width: "17rem",
            position: "relative",
            color: isDark ?  "white":GlobalColor.colors.primary_black50,
            backgroundColor: isDark ? GlobalColor.colors.primary_black50 :"white"
          }}
        >
          <img
            style={{ width: "13rem", height: "13rem", borderRadius: "0.85rem" }}
            src={item.img}
          />
          <h4 style={{ marginBottom: 0, marginTop: "1rem" }}>
            {item.projectname}
          </h4>
          <h5
            style={{
              fontFamily: "Jamsil Thin",
              fontSize: "0.8rem",
              marginTop: "0.8rem",
            }}
          >
            {item.startday}~{item.endday}
          </h5>
          {/* <div style={{ height: "5rem" }}>{item.projectinfo}</div> */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap:"wrap",
              height: "3rem",
            }}
          >
            {item.skills.map((skill, index) => (
              <div
                key={index}
                className="shadow"
                style={{
                  backgroundColor: "#909EE7",
                  color: "white",
                  padding: "0.25rem 0.64rem",
                  fontSize: "0.75rem",
                  borderRadius: "1rem",
                  height: "1.5rem",
                }}
              >
                {skill}
              </div>
            ))}
          </div>
          <AnimatePresence>
            {isHover && (
              <motion.div
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0 }} // 초기 상태에서 opacity를 0으로 설정
                animate={{ opacity: 0.8 }} // 나타날 때 opacity를 1로 설정
                exit={{ opacity: 0 }} // 사라질 때 opacity를 0으로 설정
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                  //   opacity: 0.8,
                  padding: "2rem",
                  color: "white",
                  borderRadius: "1rem",
                }}
              >
                <motion.h5
                  transition={{ duration: 0.2, delay: 0.2 }}
                  initial={{ x: -10, opacity: 0 }} // 초기 상태에서 opacity를 0으로 설정
                  animate={{ x: 0, opacity: 1 }} // 나타날 때 opacity를 1로 설정
                  exit={{ x: -10, opacity: 0 }} // 사라질 때 opacity를 0으로 설정
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  {item.projectname}
                </motion.h5>
                {/* <h5
                  style={{
                    fontFamily: "Jamsil Thin",
                    fontSize: "1rem",
                    marginTop: "0.8rem",
                  }}
                >
                  {item.startday}~{item.endday}
                </h5> */}
                <motion.div
                  transition={{ duration: 0.2, delay: 0.4 }}
                  initial={{ y: 10, opacity: 0 }} // 초기 상태에서 opacity를 0으로 설정
                  animate={{ y: 0, opacity: 1 }} // 나타날 때 opacity를 1로 설정
                  exit={{ y: 10, opacity: 0 }} // 사라질 때 opacity를 0으로 설정
                  style={{ width: "100%", height: "80%", overflow: "auto" }}
                >
                  {item.projectinfo}
                </motion.div>
                <motion.div
                  transition={{ duration: 0.2, delay: 0.6 }}
                  initial={{ x: -10, opacity: 0, rotate: -45 }} // 초기 상태에서 opacity를 0으로 설정
                  animate={{ x: 0, opacity: 1, rotate: 0 }} // 나타날 때 opacity를 1로 설정
                  exit={{ x: -10, opacity: 0, rotate: -45 }} // 사라질 때 opacity를 0으로 설정
                  style={{
                    position: "absolute",
                    bottom: "2rem",
                    right: "2rem",
                  }}
                >
                  <FontAwesomeIcon icon={faArrowRight} size="xl" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
export default ProjectCard;
