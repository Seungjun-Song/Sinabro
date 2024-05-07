import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlobalColor } from "../../services/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'; // axios import 추가
import { useDispatch } from "react-redux";
import { saveProjectRepo } from "../../store/projectCreateSlice";

const token = "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";

const ProjectGitConnect = ({ isDark }) => {
  const [isData, setIsData] = useState(null);
  const [data, setData] = useState();

  const dispatch = useDispatch()

  const handleRepository = (repo) => {
    setData(repo);
    dispatch(saveProjectRepo(repo))
  };

  const getUserRepositories = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/cho1jaeseong/repos`, // 실제 유저의 깃 아이디가 있어야함
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      setIsData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user repositories:", error);
      return null;
    }
  };

  return (
    <div
      style={{
        width: "60%",
        display: "flex",
        marginTop: "3rem",
        marginBottom: "3rem",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1rem",
          borderLeftWidth: "5px",
          borderLeftColor: isDark ? "#a098c5" : "#3f2b96",
          borderLeftStyle: "solid",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h4 style={{ margin: 0, color: isDark ? "white" : "black" }}>
          Git Repository 연결
        </h4>
      </div>
      <AnimatePresence>
        <div
          className="shadow px-5 py-4"
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            borderRadius: "1rem",
            alignItems: "center",
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            flexDirection: "column",
            backgroundColor: isDark
              ? GlobalColor.colors.primary_black50
              : "white",
          }}
        >
          {!data && (
            <>
              {" "}
              <AnimatePresence>
                {!isData && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    onClick={() => getUserRepositories()}
                    whileHover={{ cursor: "pointer", y: -3 }}
                    style={{ display: "flex", gap: 20, width: "100%" }}
                  >
                    <div
                      style={{
                        // fontWeight: "bold",
                        color: isDark ? "white" : "black",
                      }}
                    >
                      나의 레퍼지토리 목록 불러오기
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isData && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          delay: 0.5,
                          staggerChildren: 0.5,
                        },
                      },
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem",
                        fontSize: "1.2rem",
                        color: isDark ? "white" : "black",
                      }}
                    >
                      연결할 Repository를 선택해주세요!
                    </div>
                    {isData.map((item, index) => (
                      <motion.div
                        onClick={() => handleRepository(item.clone_url)}
                        whileHover={{
                          cursor: "pointer",
                          backgroundColor: "#CCD5F8",
                          y: -5,
                        }}
                        key={index}
                        style={{
                          fontSize: "1.1rem",
                          backgroundColor: isDark
                            ? GlobalColor.colors.primary_black50
                            : "white",
                          borderRadius: "10px",
                          padding: "0.75rem",
                          display: "flex",
                          gap: 5,
                          color: isDark ? "white" : "black",
                        }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <div style={{ color: isDark ? "#a098c5" : "#46359D" }}>
                          @
                        </div>
                        {item.clone_url}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          {data && (
            <AnimatePresence>
              <motion.div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                initial={{ opacity: 0, y: 20 }}
              >
                <motion.div
                  style={{
                    fontSize: "1.1rem",
                    backgroundColor: isDark ?GlobalColor.primary_black50: "white",
                    display: "flex",
                    borderBottom: "solid  2px",
                    borderColor : isDark ? "#a098c5" : "#46359D",
                    color :isDark ? "white" :"black"
                  }}
                >
                  <div style={{ color: isDark ? "#a098c5" : "#46359D" }}>@</div>
                  {data}
                </motion.div>


                <motion.div
                  whileHover={{ cursor: "pointer", scale:1.1 }}
                  onClick={() => {
                    setIsData(null), setData(null);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="xl"
                    color={isDark ? "white" : "#204FCF"}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectGitConnect;
