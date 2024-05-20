import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faClone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
const ProjectInfo = ({ dbport, runDevPreviewUrl, startPreviewUrl }) => {
  const [whatpage, setWhatPage] = useState(1);
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = (item) => {
    setIsCopy(item); // isCopy 상태를 true로 설정
    setTimeout(() => {
      setIsCopy(false); // 5초 후에 isCopy 상태를 false로 설정
    }, 2000); // 5000 밀리초 (5초)
  };
  function extractPath(url) {
    // URL에서 '/code-server'로 시작하는 부분을 찾기
    const startIndex = url.indexOf("/code-server");

    // '/code-server'로 시작하는 부분이 없다면 null 반환
    if (startIndex === -1) {
      return null;
    }

    // '/code-server'로 시작하는 부분부터 끝까지 추출
    return url.substring(startIndex);
  }

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
          height: "40rem",
          // gap: "2rem",
          display: "flex",
          overflowY: "auto",
          flexDirection: "column",
          // justifyContent: "space-between"
        }}
      >
        {/* <motion.div
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
        )} */}
        <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <motion.div
              className="shadow"
              whileHover={{ y: -5 }}
              onClick={() => setWhatPage(1)}
              style={{
                cursor: "pointer",
                color: whatpage == 1 ? "white" : "black",
                borderRadius: "1rem",
                padding: "0.6rem",
                fontSize: "0.8rem",
                backgroundColor:
                  whatpage == 1 ? "rgb(86, 76, 173)" : "rgb(245, 248, 255)",
              }}
            >
              프론트엔드 설명
            </motion.div>
            <motion.div
              className="shadow"
              whileHover={{ y: -5 }}
              onClick={() => setWhatPage(2)}
              style={{
                cursor: "pointer",
                color: whatpage == 2 ? "white" : "black",
                borderRadius: "1rem",
                padding: "0.6rem",
                fontSize: "0.8rem",
                backgroundColor:
                  whatpage == 2 ? "rgb(86, 76, 173)" : "rgb(245, 248, 255)",
              }}
            >
              백엔드 설명
            </motion.div>
            <motion.div
              className="shadow"
              whileHover={{ y: -5 }}
              onClick={() => setWhatPage(0)}
              style={{
                cursor: "pointer",
                color: whatpage == 0 ? "white" : "black",
                borderRadius: "1rem",
                padding: "0.6rem",
                fontSize: "0.8rem",
                backgroundColor:
                  whatpage == 0 ? "rgb(86, 76, 173)" : "rgb(245, 248, 255)",
              }}
            >
              기타 설명
            </motion.div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {whatpage == 0 && (
            <>
              <motion.div
                key="1"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                initial={{ opacity: 0, y: 30 }}
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  gap: "1rem",
                  flexDirection: "column",
                }}
              >
                <div style={{ borderBottom: "2px solid black" }}>
                  <div style={{ fontSize: "1.3rem" }}>{"<db 접속 방법>"}</div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <div>
                      <div>외부에서 접근 </div>
                      {dbport && (
                        <div>{`URL : projectsinabro.store:${dbport}`}</div>
                      )}
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
                  <div style={{ fontSize: "1.3rem" }}>{"<실행 결과>"}</div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ width: "5rem" }}>백엔드</div>
                    <div style={{ display: "flex", gap: "1rem" }} >{"BackEnd 섹션으로 (URL 복사하기)"}<motion.div style={{ cursor: "pointer" }}>
                        <AnimatePresence mode="wait">
                          {isCopy == 4? (
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
                                text={startPreviewUrl}
                                onCopy={() => handleCopy(4)}
                              >
                                <FontAwesomeIcon
                                  color="#5D6CD0"
                                  icon={faClone}
                                />
                              </CopyToClipboard>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div></div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ width: "5rem" }}>프론트 엔드</div>
                    <div style={{ display: "flex" ,gap:"1rem" }}>
                      <div>
                        {"npm run dev 한 후 FrontEnd 섹션으로 (URL 복사하기) "}
                      </div>
                      <motion.div style={{ cursor: "pointer" }}>
                        <AnimatePresence mode="wait">
                          {isCopy == 3 ? (
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
                                text={runDevPreviewUrl}
                                onCopy={() => handleCopy(3)}
                              >
                                <FontAwesomeIcon
                                  color="#5D6CD0"
                                  icon={faClone}
                                />
                              </CopyToClipboard>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
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
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  gap: "1rem",
                  flexDirection: "column",
                }}
              >
                <h3>{`프론트엔드 사용법 (6단계)`}</h3>
                <div>{"1.터미널창 열기(Ctrl + `)"}</div>
                <div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div>
                      {
                        "2.터미널에 npm create vite@latest입력(붙여넣기 : Shift + Insert) "
                      }
                    </div>
                    <motion.div style={{ cursor: "pointer" }}>
                      <AnimatePresence mode="wait">
                        {isCopy == 1 ? (
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
                              onCopy={() => handleCopy(1)}
                            >
                              <FontAwesomeIcon color="#5D6CD0" icon={faClone} />
                            </CopyToClipboard>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  <img
                    style={{ marginTop: "1rem", width: "35rem" }}
                    src="/images/pjtfront1.PNG"
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div>
                    {`3.`} <FontAwesomeIcon icon={faStar} />{" "}
                    {`(필수)루트 디렉토리의 vite.config.js 설정 (base: 뒤에만 다름)`}
                  </div>
                  {runDevPreviewUrl && (
                    <motion.div style={{ cursor: "pointer" }}>
                      <AnimatePresence mode="wait">
                        {isCopy == 2 ? (
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
                              text={`
                            import { defineConfig } from 'vite'
                            import react from '@vitejs/plugin-react'
                            
                            export default defineConfig({
                              plugins: [react()],
                              base: '${extractPath(runDevPreviewUrl)}',
                              server: {
                                host: '0.0.0.0',
                                port: 5173,
                                open: false,
                                hmr: {
                                  protocol: 'wss',
                                  host: 'projectsinabro.store',
                                  clientPort: 443,
                                }
                              }
                            })`}
                              onCopy={() => handleCopy(2)}
                            >
                              <FontAwesomeIcon color="#5D6CD0" icon={faClone} />
                            </CopyToClipboard>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
                <div>
                  <div>예시 이미지</div>
                  <img style={{ width: "35rem" }} src="/images/pjtfront2.PNG" />
                </div>
                <div>{`4.cd로 해당 디렉토리 이동`}</div>
                <div>{`5. npm install`}</div>
                <div>{`6. npm run dev`}</div>
              </motion.div>
            </>
          )}
          {whatpage == 2 && (
            <>
              <motion.div
                key="3"
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                initial={{ opacity: 0, y: 30 }}
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <h3>{`백엔드 사용법 (4단계) `}</h3>

                <div>
                  {`1.Ctrl + Shift + P 입력하여 Vs코드 상단의 검색바 활성화`}
                </div>

                <div>
                  <div>
                    {`2.Spring Initializr: Create a Gradle Project... 입력 후 선택`}
                  </div>
                  <img style={{ width: "35rem" }} src="/images/backpjt2.PNG" />
                </div>

                <div>{`3.사용자 개발 환경에 맞는 설정 이후 프로젝트 생성`}</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>{`4. Application.java 파일 실행 `}</div>
                  <div
                    style={{ fontSize: "0.8rem", paddingLeft: "0.5rem" }}
                  >{`위치:설정한 이름/src/main/java/~Application.java (설정값에 따라 위치가 달라질수 있습니다)`}</div>
                  <img style={{ width: "17rem" }} src="/images/backpjt1.PNG" />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ProjectInfo;
