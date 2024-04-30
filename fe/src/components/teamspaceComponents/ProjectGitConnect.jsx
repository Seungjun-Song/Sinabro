import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
const token = "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";
const ProjectGitConnect = ({ hadlebutton, IsModalOpen, setIsModalOpen }) => {
  const [isData, setIsData] = useState(null);
  const [data, setData] = useState();
  const handleRepository = (repo) => {
    setData(repo);
  };
  const fetchUserRepositories = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/cho1jaeseong/repos`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user repositories");
      }
      const repositories = await response.json();
      console.log(repositories);
      setIsData(repositories);
      return repositories;
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
          // padding: "1rem",
          borderLeftWidth: "5px", // 왼쪽 테두리 두께
          borderLeftColor: "black", // 왼쪽 테두리 색상
          borderLeftStyle: "solid", // 왼쪽 테두리 스타일
          padding: "1rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* <img style={{}} src="images/GitHub.png" /> */}
        <h4 style={{ margin: 0 }}>Git Repository 연결</h4>
      </div>
      <AnimatePresence>
        <div
          className="shadow px-5"
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            borderRadius: "1rem",
            alignItems: "center",
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            flexDirection: "column",
            backgroundColor: "white",
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
                    onClick={() => fetchUserRepositories()}
                    whileHover={{ cursor: "pointer", y: -3 }}
                    style={{ display: "flex", gap: 20, width: "100%" }}
                  >
                    <div style={{ fontWeight: "bold" }}>
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
                          delay: 0.5, // 요소들이 등장하기 전의 지연 시간
                          staggerChildren: 0.5, // 요소들이 점차적으로 등장하는 간격
                        },
                      },
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
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
                          backgroundColor: "white",
                          borderRadius: "10px",
                          padding: "0.75rem",
                          display: "flex",
                          gap: 5,
                        }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <div style={{ color: "#46359D" }}>@</div>
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
                    backgroundColor: "white",
                    display: "flex",
                    borderBottom: "solid #46359D 2px",
                  }}
                >
                  <div style={{ color: "#46359D" }}>@</div>
                  {data}
                </motion.div>
                <motion.img
                  whileHover={{ y: -5, cursor: "pointer" }}
                  onClick={() => {
                    setIsData(null), setData(null);
                  }}
                  style={{ width: "1rem", height: "1rem" }}
                  src="/images/close_blue.png"
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectGitConnect;
