import {
  faClock,
  faClone,
  faFaceTired,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowUpRightFromSquare,
  faBug,
  faCheck,
  faCircle,
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleExclamation,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyToClipboard from "react-copy-to-clipboard";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Softwareimpacted from "./Softwareimpacted";
import Tag from "./tag";
const icon = {
  CODE_SMELL: faFaceTired,
  VULNERABILITY: faShieldHalved,
  BUG: faBug,
};
faCircleExclamation;
const icon_severity = {
  HIGH: {
    icon: faCircleExclamation,
    bgColor: "rgb(255, 245, 251)",
    color: "rgb(146, 49, 83)",
    bordercolor: "rgb(234, 143, 166)",
  },
  MEDIUM: {
    icon: faCircleChevronUp,
    bgColor: "rgb(252, 245, 228)",
    color: "rgb(140, 94, 30)",
    bordercolor: "rgb(250, 220, 121)",
  },
  LOW: {
    icon: faCircleChevronDown,
    bgColor: "rgb(245, 251, 255)",
    color: "rgb(49, 108, 146)",
    bordercolor: "rgb(143, 202, 234)",
  },
};
const icon_Danger = {
  BLOCKER: {
    icon: faCircleExclamation,
    color: "rgb(146, 49, 83)",
  },
  CRITICAL: {
    icon: faCircleExclamation,
    color: "rgb(146, 49, 83)",
  },
  MAJOR: {
    icon: faCircleChevronUp,
    color: "rgb(140, 94, 30)",
  },
  MINOR: {
    icon: faCircleChevronDown,
    color: "rgb(49, 108, 146)",
  },
  INFO: {
    icon: faCircleChevronDown,
    color: "rgb(49, 108, 146)",
  },
};

const problem_list = {
  CODE_SMELL:
    "A maintainability issue that makes your code confusing and difficult to maintain",
  BUG: " A coding mistake that can lead to an error or unexpected behavior at runtime",
  VULNERABILITY: "A point in your code that's open to attack",
};

const danger_list = {
  BLOCKER:
    " Issues with a high or low probability to impact the behavior of the application in production, or represent a security flaw. For example, a memory leak, an unclosed JDBC connection, an empty catch block, or an SQL injection. Reviewing these issues should be a top priority. ",
  CRITICAL:
    "  Issues with a high or low probability to impact the behavior of the application in production, or represent a security flaw. For example, a memory leak, an unclosed JDBC connection, an empty catch block, or an SQL injection. Reviewing these issues should be a top priority. ",
  MAJOR:
    "A quality flaw that can highly impact the developer's productivity. For example, an uncovered piece of code, duplicated blocks, or unused parameters.",
  MINOR: ` A quality flaw that can slightly impact the developer's productivity. For example, lines should not be too long, and "switch" statements should have at least 3 cases. This severity level also includes issues that are neither bugs nor quality flaws, just findings.`,
  INFO: ` A quality flaw that can slightly impact the developer's productivity. For example, lines should not be too long, and "switch" statements should have at least 3 cases. This severity level also includes issues that are neither bugs nor quality flaws, just findings.`,
};

const RightError = ({ isSelect,isDark }) => {
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = () => {
    setIsCopy(true); // isCopy 상태를 true로 설정
    setTimeout(() => {
      setIsCopy(false); // 5초 후에 isCopy 상태를 false로 설정
    }, 2000); // 5000 밀리초 (5초)
  };
  const [isDangerHover, setIsDangerHover] = useState(false);

  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <AnimatePresence mode="wait" >
        {isSelect && (
          <motion.div
            key={isSelect.id}
            // animate={{ opacity: 1,y:0 }}
            // initial={{ opacity: 0 ,y:100}}
            // exit={{ opacity: 0, y:-100}}
            transition={{duration:0.3, type:"easeInOut" }}
            className="shadow"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "3rem",
              padding: "3rem",
              // border : isDark ? "3px solid #ccd5f8" :"none"
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  // gap: "0.75rem",
                  flexDirection: "column",
                  height: "12rem",
                  width: "70%",
                  borderLeft: "2px solid  #ccd5f8",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontWeight: "bold",
                    gap: "1rem",
                    justifyContent: "space-between",
                    fontSize: "1.1rem",
                    padding: "1rem",
                    borderTop: "2px solid  #ccd5f8",
                    color : isDark ? "white" :"black"
                  }}
                >
                  <div>{isSelect.message}</div>
                  <div
                    style={{
                      fontSize: "1rem",
                      // borderBottom: "solid 1px #5D6CD0",
                      color: "#5D6CD0",
                    }}
                  >
                    {isSelect.rule}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "3rem",
                    borderBottom: "2px solid  #ccd5f8",
                    paddingLeft: "1rem",
                    paddingBottom: "1rem",
                    width: "100%",
                    color : isDark ? "white" :"black"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    소요시간:
                    <FontAwesomeIcon icon={faClock} /> {isSelect.effort}분
                  </div>
                  <motion.div
                    onHoverStart={() => setIsHover(true)}
                    onHoverEnd={() => setIsHover(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      position: "relative",
                    }}
                  >
                    타입: <FontAwesomeIcon icon={icon[isSelect.type]} />{" "}
                    {isSelect.type}
                    <AnimatePresence>
                      {isHover && (
                        <motion.div
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          style={{
                            position: "absolute",
                            top: 30,
                            left: -15,
                            height: "auto",
                            width: "20rem",
                            backgroundColor: "rgb(62, 67, 87)",
                            padding: "1rem",
                            zIndex: 1,
                            color: "white",
                            borderRadius: "1rem",
                            fontSize: "0.9rem",
                          }}
                        >
                          <div
                            style={{
                              borderBottom: "solid 2px white",
                              paddingBottom: "1rem",
                            }}
                          >
                            {problem_list[isSelect.type]}
                          </div>
                          <div style={{ paddingTop: "1rem" }}>
                            <a
                              style={{
                                padding: 0,
                                margin: 0,
                                color: "#4B56BB",
                              }}
                              href="https://docs.sonarsource.com/sonarqube/10.5/user-guide/clean-code/introduction/"
                              target="_blank"
                            >
                              Learn More
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                              />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <motion.div
                    onHoverStart={() => setIsDangerHover(true)}
                    onHoverEnd={() => setIsDangerHover(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      position: "relative",
                    }}
                  >
                    위험:{" "}
                    <div
                      style={{ color: icon_Danger[isSelect.severity].color }}
                    >
                      <FontAwesomeIcon
                        icon={icon_Danger[isSelect.severity].icon}
                      />{" "}
                      {isSelect.severity}
                    </div>
                    <AnimatePresence>
                      {isDangerHover && (
                        <motion.div
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          style={{
                            position: "absolute",
                            top: 30,
                            left: -15,
                            height: "auto",
                            width: "30rem",
                            backgroundColor: "rgb(62, 67, 87)",
                            padding: "1rem",
                            zIndex: 1,
                            color: "white",
                            borderRadius: "1rem",
                            fontSize: "0.9rem",
                          }}
                        >
                          <div
                            style={{
                              borderBottom: "solid 2px white",
                              paddingBottom: "1rem",
                            }}
                          >
                            {danger_list[isSelect.severity]}
                          </div>
                          <div style={{ paddingTop: "1rem" }}>
                            <a
                              style={{
                                padding: 0,
                                margin: 0,
                                color: "#4B56BB",
                              }}
                              href="https://docs.sonarsource.com/sonarqube/10.5/user-guide/clean-code/introduction/"
                              target="_blank"
                            >
                              Learn More
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                              />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                <div
                  style={{ display: "flex", gap: "1rem", padding: "0 1rem" }}
                >
                  {isSelect.tags.map((item, index) => (
                    <Tag isDark={isDark} item={item} />
                  ))}
                </div>
              </div>
              <div
                style={{
                  height: "12rem",
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "2px solid #ccd5f8",
                  padding: "1rem",
                  borderTop: "2px solid  #ccd5f8",
                  borderRight: "2px solid  #ccd5f8",
                  color : isDark ? "white" :"black"
                }}
              >
                <div>Software qualities impacted</div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "1rem",
                  }}
                >
                  {isSelect.impacts.map((item, index) => (
                    <Softwareimpacted item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "calc(100% - 12rem)",
                border: "2px solid #ccd5f8",
                display: "flex",
                flexDirection: "column",
                color : isDark ? "white" :"black"
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  width: "100%",
                  padding: "1.5rem",
                  borderBottom: "2px solid #ccd5f8",
                }}
              >
                <div>위치 : {isSelect.component}</div>
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
                          text={isSelect.component}
                          onCopy={handleCopy}
                        >
                          <FontAwesomeIcon color="#5D6CD0" icon={faClone} />
                        </CopyToClipboard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              <div style={{ display: "flex", gap: "1rem", height: "100%" }}>
                <div
                  style={{
                    borderRight: "solid 2px #ccd5f8",
                    padding: "1rem 1.5rem",
                    height: "100%",
                    width: "15%",
                  }}
                >
                  Line : {isSelect.startLine}
                </div>
                <div style={{ width: "85%", padding: "0 1rem" }}>
                  <div
                    style={{
                      position: "relative",
                      padding: "1rem 0",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        textDecoration: "underline",
                        textDecorationStyle: "wavy",
                        textDecorationColor: "rgb(253, 162, 155)",
                        textUnderlineOffset: "0.5rem",
                        textDecorationThickness: "0.15rem",
                      }}
                    >
                      {isSelect.issueCode}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "110%",
                        left: "0%",
                        padding: "1rem",
                        border: "solid 2px rgb(253, 162, 155)",
                        borderRadius: "1rem",
                        width: "100%",
                        fontSize: "1.1rem",
                        // fontWeight:"bold"
                      }}
                    >
                      {isSelect.message}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        left: "20%",
                        height: "calc(150% - 3.9rem)",
                        borderRight: "solid 2px rgb(253, 162, 155)",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        left: "19.5%",
                        top: "58%",
                      }}
                    >
                      <FontAwesomeIcon
                        color="rgb(253, 162, 155)"
                        icon={faCircle}
                        size="2xs"
                      />
                    </div>
                    {/* <div
                    style={{
                      position: "absolute",
                      left: "19.5%",
                      top: "130%",
                    }}
                  >
                    <FontAwesomeIcon
                      color="rgb(253, 162, 155)"
                      icon={faCircle}
                      size="2xs"
                    />
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default RightError;
