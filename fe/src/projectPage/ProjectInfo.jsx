import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faClone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
const ProjectInfo = () => {
  const [whatpage, setWhatPage] = useState(0);
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = () => {
    setIsCopy(true); // isCopy 상태를 true로 설정
    setTimeout(() => {
      setIsCopy(false); // 5초 후에 isCopy 상태를 false로 설정
    }, 2000); // 5000 밀리초 (5초)
  };
  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        className="shadow"
        style={{
          position: "absolute",
          top: "1rem",
          left: "0",
          padding: "2rem",
          backgroundColor: "white",
          zIndex: "1",
          borderRadius: "1rem",
          width: "40rem",
          height: "38rem",
          // gap: "2rem",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between"
        }}
      >
        <motion.div
          onClick={() => setWhatPage((prev) => prev + 1)}
          whileHover={{ x: 5 }}
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1.5rem",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon size="lg" icon={faArrowRight} />
        </motion.div>
        {whatpage != 0 && (
          <motion.div
            onClick={() => setWhatPage((prev) => prev - 1)}
            whileHover={{ x: -5 }}
            style={{
              position: "absolute",
              top: "1rem",
              left: "1.5rem",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon size="lg" icon={faArrowLeft} />
          </motion.div>
        )}
        <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>{`${
          whatpage + 1
        }/3`}</div>
        <AnimatePresence mode="wait">
          {whatpage == 0 && (
            <>
              <motion.div
                key="1"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                initial={{ opacity: 0, y: 30 }}
              >
                <div style={{ borderBottom: "2px solid black" }}>
                  <div style={{ fontSize: "1.3rem" }}>{"<db 접속 방법>"}</div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div>
                      <div>외부에서 접근 </div>
                      <div>{`URL : projectsinabro.store:{dbPort}`}</div>
                      <div>PASSWORD : ssafy</div>
                    </div>
                    <div>
                      <div>{"CLI에서 접근 (터미널 여는법 Ctrl + `)"}</div>
                      <div>{`COMMAND : mysql -u root -p`}</div>
                      <div>PASSWORD : ssafy</div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ borderBottom: "2px solid black", marginTop: "1rem" }}
                >
                  <div style={{ fontSize: "1.3rem" }}>{"<깃 사용법>"}</div>
                  {/* <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <img
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    src="/images/gituse.PNG"
                  />
                  <div>Vs코드의 Source Control로 이동하기</div>
                </div>
                <div style={{ alignItems: "center" }}>
                  <div>
                    <img src="/images/Group_197.png" />
                  </div>
                  <div style={{ display: "flex" }}>
                    <img src="/images/syncChange.PNG" />
                    <div>
                      <div>3.1 Sync Chages를 통해 Git push가능</div>
                      <div>3.2깃 허브 로그인 후 접근 권한 수락</div>
                    </div>
                  </div>
                </div> */}
                  <img style={{ width: "35rem" }} src="/images/Group_198.png" />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ fontSize: "1.3rem" }}>{"<URL 연결>"}</div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ width: "5rem" }}>백엔드</div>
                    <div>{"{자신의 코드 서버 URL}/proxy/8080/ "}</div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ width: "5rem" }}>프론트 엔드</div>
                    <div>
                      <div>{"npm run dev 한 경우 Dev 섹션으로 "}</div>
                      <div>{"npm start 한 경우 Start 섹션으로 "}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
          {whatpage == 1 && (
            <>
              <motion.div
                key="2"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                initial={{ opacity: 0, y: 30 }}
                style={{ marginTop: "2rem" }}
              >
                <h3>프론트엔드 사용법</h3>
                <div>{"1. 터미널창 열기(Ctrl + `)"}</div>
                <div style={{display:"flex" ,gap:"1rem"}}>
                  <div  >{"2. 터미널에 npm create vite@latest 입력 "}</div>
                  <motion.div style={{ cursor: "pointer" }}>
                    <AnimatePresence mode="wait">
                      {isCopy ? (
                        <motion.div
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          key="check"
                        >
                          <FontAwesomeIcon color="#5D6CD0" icon={faCheck} />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          key="clone"
                        >
                          <CopyToClipboard
                            text={`npm create vite@latest`}
                            onCopy={handleCopy}
                          >
                            <FontAwesomeIcon color="#5D6CD0" icon={faClone} />
                          </CopyToClipboard>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                <div>
                  {`3. 루트 디렉토리의 vite.config.js 설정(필수)`}
                </div>
              </motion.div>
            </>
          )}
          {whatpage == 2 && (
            <>
              <motion.div
                key="2"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                initial={{ opacity: 0, y: 30 }}
                style={{ marginTop: "2rem" }}
              ></motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ProjectInfo;
