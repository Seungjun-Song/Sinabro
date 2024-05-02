import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ProjectInviteImg = ({ img, name, nameId, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const list = ["FE", "BE", "FULL"];
  const [isHovered, setIsHovered] = useState(false);
  const [job, setJob] = useState(null);
  // 호버 시작 시 실행되는 함수
  const handleHoverStart = (item) => {
    setIsHovered(item);
    // 호버 시작 시 실행할 함수를 여기에 추가하세요
    console.log(item);
  };

  // 호버 종료 시 실행되는 함수
  const handleHoverEnd = () => {
    setIsHovered(false);
    // 호버 종료 시 실행할 함수를 여기에 추가하세요
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <motion.div style={{ gap: "1rem" }}>
          <motion.img
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ cursor: "pointer", y: -7 }}
            className="shadow"
            src={img}
            style={{ width: "5rem", height: "5rem", borderRadius: "3rem" }}
          />
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: isDark ? "white" : "black",
            }}
          >
            {name}
          </div>
          <motion.img
            whileHover={{ cursor: "pointer", opacity: 1.1, scale: 1.1 }}
            style={{
              position: "absolute",
              width: "0.6rem",
              top: -5,
              right: -5,
              opacity: 0.3,
            }}
            src="/images/close_blue.png"
          />
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="shadow"
              style={{
                position: "absolute",
                bottom: "10rem",
                left: "-100%",
                backgroundColor: "white",
                // borderRadius: "1rem",
                zIndex: 99,
              }}
            >
              {/* 드롭다운 내용 */}
              <motion.div
                style={{ display: "flex", justifyContent: "space-between" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {list.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => (setJob(item), setIsOpen(false))}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{
                      backgroundColor: getColor(item),
                      cursor: "pointer",
                    }}
                    onHoverStart={() => handleHoverStart(item)}
                    onHoverEnd={handleHoverEnd}
                    key={index}
                    style={{
                      //   border: "3px solid black",
                      width: "5rem",
                      textAlign: "center",
                      padding: "1rem",
                    }}
                  >
                    <motion.h5
                      style={{
                        margin: 0,
                        fontWeight: "bold",
                        color:
                          isHovered && isHovered == item
                            ? "white"
                            : getColor(item),
                      }}
                    >
                      {item}
                    </motion.h5>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          style={{
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: getColor(job),
          }}
        >
          {getJob(job)}
        </div>
      </div>{" "}
    </>
  );
};
const getColor = (item) => {
  // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
  // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
  return item === "FE"
    ? "#3DC7AE"
    : item === "BE"
    ? "#315DCC"
    : item === "FULL"
    ? "#6C31CC"
    : "black";
};

const getJob = (item) => {
  // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
  // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
  return item === "FE"
    ? "프론트엔드"
    : item === "BE"
    ? "백엔드"
    : item === "FULL"
    ? "풀스택"
    : "역할 선택";
};
export default ProjectInviteImg;
