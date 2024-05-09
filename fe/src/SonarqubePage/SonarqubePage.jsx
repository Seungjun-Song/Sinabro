import { useState } from "react";
import LeftError from "../components/SonarQube/LeftError";
import RightError from "../components/SonarQube/RightError";
import Navbar from "../components/navs/Navbar";
import { useSelector } from "react-redux";
import { GlobalColor } from "../services/color";

const DUMMY_DATA = [
  {
    rule: "java:S1068",
    severity: "MAJOR",
    component:
      "gamme/backend/src/main/java/ssafy/ggame/domain/topic/dto/TopicNewsResDto.java",
    startLine: 17,
    endLine: 17,
    startOffset: 22,
    endOffset: 34,
    message: 'Remove this unused "hotTopicDate" private field.',
    effort: 5,
    type: "CODE_SMELL",
    impacts: [
      {
        softwareQuality: "MAINTAINABILITY",
        severity: "HIGH",
      },
    ],
    tags: ["unused"],
    issueCode: "private LocalDate hotTopicDate;",
  },
  {
    rule: "java:S106",
    severity: "MAJOR",
    component:
      "gamme/backend/src/main/java/ssafy/ggame/domain/topic/service/TopicServiceImpl.java",
    startLine: 109,
    endLine: 109,
    startOffset: 8,
    endOffset: 18,
    message: "Replace this use of System.out by a logger.",
    effort: 10,
    type: "CODE_SMELL",
    impacts: [
      {
        softwareQuality: "MAINTAINABILITY",
        severity: "MEDIUM",
      },
    ],
    tags: ["bad-practice", "cert"],
    issueCode: 'System.out.println(keyword+" 크롬 드라이버 실행전");',
  },
  {
    rule: "java:S106",
    severity: "MAJOR",
    component:
      "gamme/backend/src/main/java/ssafy/ggame/domain/topic/service/TopicServiceImpl.java",
    startLine: 112,
    endLine: 112,
    startOffset: 8,
    endOffset: 18,
    message: "Replace this use of System.out by a logger.",
    effort: 10,
    type: "CODE_SMELL",
    impacts: [
      {
        softwareQuality: "MAINTAINABILITY",
        severity: "MEDIUM",
      },
    ],
    tags: ["bad-practice", "cert"],
    issueCode: 'System.out.println(keyword+" 크롬 드라이버 실행후");',
  },
  {
    rule: "java:S117",
    severity: "MINOR",
    component:
      "gamme/backend/src/main/java/ssafy/ggame/domain/topic/service/TopicServiceImpl.java",
    startLine: 115,
    endLine: 115,
    startOffset: 19,
    endOffset: 22,
    message:
      "Rename this local variable to match the regular expression '^[a-z][a-zA-Z0-9]*$'.",
    effort: 2,
    type: "CODE_SMELL",
    impacts: [
      {
        softwareQuality: "MAINTAINABILITY",
        severity: "LOW",
      },
    ],
    tags: ["convention"],
    issueCode:
      'String URL = "https://www.gamemeca.com/search.php?q=" + keyword;',
  },
  {
    rule: "java:S3626",
    severity: "MINOR",
    component:
      "gamme/backend/src/main/java/ssafy/ggame/domain/topic/service/TopicServiceImpl.java",
    startLine: 156,
    endLine: 156,
    startOffset: 12,
    endOffset: 19,
    message: "Remove this redundant jump.",
    effort: 1,
    type: "CODE_SMELL",
    impacts: [
      {
        softwareQuality: "MAINTAINABILITY",
        severity: "LOW",
      },
    ],
    tags: ["redundant", "clumsy"],
    issueCode: "return; //해당하는 요소들이 없으면 그냥 return",
  },
];

const SonarqubePage = () => {
  const [isSelect, setIsSelect] = useState({ id: 0, ...DUMMY_DATA[0] });
  function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return {
      hours: hours,
      minutes: remainingMinutes,
    };
  }
  const effortTotal = 911;
  const { hours, minutes } = convertMinutesToHoursAndMinutes(effortTotal);
  const isDark = useSelector((state) => state.isDark.isDark);
  // console.log
  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "80px",
          backgroundColor: isDark ? GlobalColor.colors.primary_black : "white",
          transition: "0.3s",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            height: "85%",
            alignItems: "center",
            // marginTop:"80px"
          }}
        >
          <div
            className="col-3 shadow"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: isDark ? GlobalColor.colors.primary_black50:"white"
            }}
          >
            <div
              // className="shadow"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                borderBottom: "1px solid #ccd5f8",
                color: isDark ? "white" : "black",
              }}
            >
              <div>Total Time : {`${hours}시${minutes}분 `}</div>
              <div>{DUMMY_DATA.length}Issues</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                height: "100%",
                overflowY: "auto",
              }}
            >
              {DUMMY_DATA.map((item, index) => (
                <LeftError
                  isSelect={isSelect}
                  setIsSelect={setIsSelect}
                  key={index}
                  item={item}
                  index={index}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
          <div style={{ marginLeft: "2rem", width: "100%", height: "100%" }}>
            <RightError isDark={isDark} isSelect={isSelect} />
          </div>
        </div>
      </div>
    </>
  );
};
export default SonarqubePage;
