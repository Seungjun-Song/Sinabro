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
  faL,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyToClipboard from "react-copy-to-clipboard";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Softwareimpacted from "./Softwareimpacted";
import Tag from "./tag";
const icon = {
  CODE_SMELL: faFaceTired,
  VULNERABILITY: faShieldHalved,
  BUG: faBug,
};

const getColor = (item) => {
  if (item == "OPEN") {
    return "#6ee094";
  } else if (item == "ACCEPTED") {
    return "#6e77e0";
  } else if (item == "FIXED") {
    return "#6e9fe0";
  } else if (item == "FALSE_POSITIVE") {
    return "#e06e6e";
  } else if (item == "CONFIRMED") {
    return "#a36ee0";
  }
  return "#e0c36e";
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

const issue_info = {
  OPEN: [
    "SonarQube에서 새 이슈에 대해 설정",
    "마지막 분석 이후로 수정되지 않은 이슈에 대해 설정",
  ],
  ACCEPTED: [
    "이슈가 유효하며 지금 당장은 수정되지 않을 것임을 나타내기 위해 수동으로 설정",
    `프로젝트의 "이슈 관리" 권한 수준이 필요`,
  ],
  FIXED: [
    "이슈가 수정되었음을 나타냄",
    "분석 중에 SonarQube에 의해 자동으로 설정되거나(구식 방법) 수동으로 설정됨",
  ],
  FALSE_POSITIVE: [
    "분석이 잘못되었고 이슈가 유효하지 않음을 나타내기 위해 수동으로 설정",
  ],
  CONFIRMED: ["이슈가 유효함을 나타내기 위해 수동으로 설정"],
};

const RightError = ({ isSelect, isDark }) => {
  function getLastNthPathSeparatorSubstring(path, n) {
    let currentIndex = path.length - 1;
    let count = 0;
    while (currentIndex >= 0) {
      if (path[currentIndex] === "/") {
        count++;
        if (count === n) {
          return path.substring(currentIndex + 1);
        }
      }
      currentIndex--;
    }
    return ""; // nth 슬래시가 없으면 빈 문자열 반환
  }
  const [isCopy, setIsCopy] = useState(false);
  const handleCopy = () => {
    setIsCopy(true); // isCopy 상태를 true로 설정
    setTimeout(() => {
      setIsCopy(false); // 5초 후에 isCopy 상태를 false로 설정
    }, 2000); // 5000 밀리초 (5초)
  };
  const [isDangerHover, setIsDangerHover] = useState(false);
  const [isStatusHover, setIsStatusHover] = useState(false);
  const [isHover, setIsHover] = useState(false);
  function countOccurrences(str, char) {
    const regex = new RegExp(char, "g");
    const matches = str.match(regex);
    return matches ? matches.length : 0;
  }
  let component = isSelect.component;
  let slashcount = countOccurrences(isSelect.component, "/");
  while (component.length > 90) {
    component = getLastNthPathSeparatorSubstring(component, slashcount - 1);
    slashcount = slashcount - 1;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isSelect && (
          <motion.div
            key={isSelect.id}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, type: "easeInOut" }}
            className="shadow"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "3rem",
              padding: "3rem",
              overflowY: "auto",
              // overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

              // border : isDark ? "3px solid #ccd5f8" :"none"
            }}
          >
            <div style={{ display: "flex", minHeight: "12rem" }}>
              <div
                style={{
                  display: "flex",
                  // gap: "0.75rem",
                  flexDirection: "column",
                  // height: "12rem",
                  width: "75%",
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
                    color: isDark ? "white" : "black",
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
                    gap: "1rem",
                    borderBottom: "2px solid  #ccd5f8",
                    paddingLeft: "1rem",
                    paddingBottom: "1rem",
                    width: "100%",
                    color: isDark ? "white" : "black",
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
                  <motion.div
                    onHoverStart={() => setIsStatusHover(true)}
                    onHoverEnd={() => setIsStatusHover(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      position: "relative",
                    }}
                  >
                    이슈 상태:{" "}
                    <div
                      style={{
                        fontSize: "0.7rem",
                        border: "2px solid",
                        padding: "0.4rem",
                        borderRadius: "15rem",
                        borderColor: getColor(isSelect.issueStatus),
                      }}
                    >
                     {isSelect.issueStatus}
                    </div>
                    <AnimatePresence>
                      {isStatusHover && (
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
                              display: "flex",
                              borderBottom: "solid 2px white",
                              paddingBottom: "1rem",
                              flexDirection: "column", // "flexDirection"으로 수정해야 합니다.
                            }}
                          >
                            {issue_info[isSelect.issueStatus].map((item) => (
                              <div>{item}</div>
                            ))}
                          </div>
                          <div style={{ paddingTop: "1rem" }}>
                            <a
                              style={{
                                padding: 0,
                                margin: 0,
                                color: "#4B56BB",
                              }}
                              href="https://hungry-attention-0f2.notion.site/Sinabro-SonarQube-Info-d1511683b1b641369162a295e8ad3324#db8b8ed67d6d43d88965a8bc27636fbf"
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
                    <Tag isDark={isDark} item={item} key={index} />
                  ))}
                </div>
              </div>
              <div
                style={{
                  // height: "12rem",
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "2px solid #ccd5f8",
                  padding: "1rem",
                  borderTop: "2px solid  #ccd5f8",
                  borderRight: "2px solid  #ccd5f8",
                  color: isDark ? "white" : "black",
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
                    <Softwareimpacted item={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "auto",
                border: "2px solid #ccd5f8",
                display: "flex",
                flexDirection: "column",
                color: isDark ? "white" : "black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  width: "100%",
                  padding: " 1rem",
                  borderBottom: "2px solid #ccd5f8",
                }}
              >
                {component && <div>위치 : {component}</div>}

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
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  height: "100%",
                  minHeight: "14.1rem",
                }}
              >
                <div
                  style={{
                    borderRight: "solid 2px #ccd5f8",
                    padding: "1rem 1.5rem",
                    // height: "100%",
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
                        // position: "absolute",
                        // left: "19.5%",
                        // top: "58%",
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "2.3rem",
                        height: "0.2rem",
                      }}
                    >
                      <FontAwesomeIcon
                        color="rgb(253, 162, 155)"
                        icon={faCircle}
                        size="2xs"
                      />
                    </div>
                    <div
                      style={{
                        // marginTop:"5rem",
                        // position: "absolute",
                        // left: "20%",
                        height: "2rem",
                        width: "2rem",
                        borderRight: "solid 2px rgb(253, 162, 155)",
                      }}
                    ></div>
                    <div
                      style={{
                        // position: "absolute",
                        // top: "110%",
                        // left: "0%",
                        padding: "1rem",
                        // marginTop: "3rem",
                        border: "solid 2px rgb(253, 162, 155)",
                        borderRadius: "1rem",
                        width: "100%",
                        fontSize: "1.1rem",
                        // fontWeight:"bold"
                      }}
                    >
                      {isSelect.message}
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
