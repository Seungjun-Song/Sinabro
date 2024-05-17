import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProjectMemberAtIndex, updateProjectMemberAtIndex } from "../../store/projectCreateSlice";
import { removeInvitedUserByIndex } from "../../store/invitedUserListSlice";

const ProjectInviteImg = ({ img, name, nameId, isDark, idx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const list = ["FE", "BE", "FULL"];
  const [isHovered, setIsHovered] = useState(false);
  const [job, setJob] = useState(null);
  const dispatch = useDispatch()

  const userInfo = useSelector(state => state.user)

  const updateJob = (j) => {
    if (j === 'FE') {
      const n = 100
      dispatch(updateProjectMemberAtIndex({ index: idx, newValue: n }))
    }
    else if (j === 'BE') {
      const n = 200
      dispatch(updateProjectMemberAtIndex({ index: idx, newValue: n }))
    }
    else if (j === 'FULL') {
      const n = 300
      dispatch(updateProjectMemberAtIndex({ index: idx, newValue: n }))
    }
  }

  // 호버 시작 시 실행되는 함수
  const handleHoverStart = (item) => {
    setIsHovered(item);
    // 호버 시작 시 실행할 함수를 여기에 추가하세요
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
          <div style={{display: "flex", justifyContent:"center"}}>
          <motion.img
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ cursor: "pointer", y: -7 }}
            className="shadow"
            src={img}
            style={{ width: "5rem", height: "5rem", borderRadius: "3rem" }}
          />
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: isDark ? "white" : "black",
            }}
          >
            {name}
          </div>
          {name !== userInfo.currentUser.displayName ?
            <motion.img
              whileHover={{ cursor: "pointer", opacity: 1.1, scale: 1.1 }}
              style={{
                position: "absolute",
                width: "0.6rem",
                top: -5,
                right: -5,
                opacity: isDark ? 1 : 0.3,
              }}
              src={isDark ? 'images/close_red.png' : "/images/close_blue.png"}
              onClick={() => { dispatch(removeProjectMemberAtIndex(idx)), dispatch(removeInvitedUserByIndex(idx)) }}
            />
            :
            <></>
          }
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
                    onClick={() => (setJob(item), updateJob(item), setIsOpen(false))}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{
                      backgroundColor: getColor({ item, isDark }),
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
                            : getColor({ item, isDark }),
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
        <AnimatePresence>
          <motion.div
            whileHover={{ cursor: "pointer", y: -4 }}
            style={{
              height: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: getColor({ item: job, isDark }),
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {getJob(job)}
          </motion.div>
        </AnimatePresence>
      </div>{" "}
    </>
  );
};
const getColor = ({ item, isDark }) => {
  // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
  // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
  if (item === "FE") {
    return "#3DC7AE"
  }
  else if (item === "BE") {
    return "#315DCC"
  }
  else if (item === "FULL") {
    return "#6C31CC"
  }
  else {
    return isDark ? 'white' : "grey"
  }
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
