import { useState, useEffect } from "react";
import LeftError from "../components/SonarQube/LeftError";
import RightError from "../components/SonarQube/RightError";
import Navbar from "../components/navs/Navbar";
import { useSelector } from "react-redux";
import { GlobalColor } from "../services/color";
import getEnv from "../utils/getEnv";
import axios from "axios";
import style from "./SonarqubePage.module.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const SonarqubePage = () => {
  const [isSelect, setIsSelect] = useState(null);
  const [page, setPage] = useState(1);
  const [addLoading, setAddLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태를 true로 초기화
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState(null);
  // select 변경을 처리하는 함수
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    const selectedIndex = event.target.selectedIndex;
    const text = event.target.options[selectedIndex].text;
    setStatusText(text);
  };
  // bulk - change
  const bulkChange = async () => {
    if (status == null || status == "select") {
      return Swal.fire({
        title: "변경될 이슈상태가 선택되지 않았습니다.",
        text: "상태를 선택 후, 다시 실행해주세요.",
        icon: "error",
      });
    }

    // SweetAlert2 모달을 async/await와 함께 사용하기
    const result = await Swal.fire({
      title: `${statusText}로 \n 상태를 변경하시겠습니까?`,
      text: `총 ${selectedKeys.length}개의 이슈가 변경됩니다.`,
      icon: "question",
      footer:
        '<a target="_blank" href="https://hungry-attention-0f2.notion.site/Sinabro-SonarQube-Info-d1511683b1b641369162a295e8ad3324#db8b8ed67d6d43d88965a8bc27636fbf">"이슈의 상태"에 따라 요청이 무시되는 경우가 존재합니다. 🧐</a>',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      reverseButtons: true,
    });

    // 결과 처리
    if (result.isConfirmed) {
      try {
        const res = await axios.post(
          `${back_url}/scan/status`,
          {
            keyList: selectedKeys,
            issueStatus: status, // 이 변수는 이 함수 스코프 안에서 정의되어야 합니다.
          },
          { withCredentials: true }
        );
        if (res.data.isSuccess) {
          Swal.fire({
            title: "요청이 완료되었습니다.",
            text: "페이지를 다시 로딩합니다.",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = window.location.toString();
            }
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire("에러 발생", "네트워크 오류가 발생했습니다.", "error");
      }
    }
  };

  // 페이지 추가 및 요청
  const nextPage = async () => {
    setAddLoading(true);
    const nextPageNumber = page + 1; // 미리 다음 페이지 번호 계산
    setPage(nextPageNumber); // 페이지 상태 업데이트

    try {
      const res = await axios.post(
        `${back_url}/scan-result`,
        {
          projectId: projectId,
          pageNumber: nextPageNumber, // 계산된 다음 페이지 번호 사용
        },
        { withCredentials: true }
      );
      const fetchedIssues = res.data.result.issues;
      console.log(`Fetched issues length: ${fetchedIssues.length}`);
      console.log(fetchedIssues);
      setIssues((prevIssues) => {
        const newIssues = [...prevIssues, ...fetchedIssues];
        console.log(`Previous issues length: ${prevIssues.length}`);
        console.log(`New issues length: ${newIssues.length}`);
        if (newIssues.length == total) setIsEnd(true);
        return newIssues; // 올바른 상태 업데이트 반환
      });
    } catch (err) {
      console.error(err);
      setPage((prevPage) => prevPage - 1); // 에러 시 페이지 번호 롤백
    } finally {
      setAddLoading(false);
    }
  };

  const handleSelectKey = (key) => {
    setSelectedKeys((prev) => {
      if (prev.includes(key)) {
        const newSelected = prev.filter((k) => k !== key);
        console.log(newSelected);
        return newSelected; // 키가 이미 있으면 제거
      } else {
        const newSelected = [...prev, key];
        console.log(newSelected);
        return newSelected; // 키가 없으면 추가
      }
    });
  };

  // API로부터 받아올 이슈들을 담을 변수
  const [issues, setIssues] = useState([]);
  const [effortTotal, setEffortTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [openTotal, setOpenTotal] = useState(0);
  const back_url = getEnv("BACK_URL");
  const myCurrentProject = useSelector((state) => state.myCurrentProject.value); //프로젝트
  var projectId = myCurrentProject?.projectId;
  useEffect(() => {
    if (projectId) {
      getSonarQubeResult();
    } else {
      setLoading(false); // projectId가 없다면 로딩 상태를 false로 설정
    }
  }, [projectId]); // projectId가 변경될 때마다 실행
  // 소나큐브 결과 가져오기
  const getSonarQubeResult = async () => {
    setLoading(true); // API 호출 전 로딩 상태를 true로 설정
    try {
      const res = await axios.post(
        `${back_url}/scan-result`,
        {
          projectId: projectId,
          pageNumber: page,
        },
        { withCredentials: true }
      );
      console.log(res);
      const fetchedIssues = res.data.result.issues;
      setIssues(fetchedIssues);
      setEffortTotal(res.data.result.effortTotal);
      setTotal(res.data.result.total);
      setOpenTotal(res.data.result.openTotal);
      // 첫 번째 항목을 선택 상태로 설정
      setIsSelect({ id: 0, ...fetchedIssues[0] });

      console.log("init fetch", fetchedIssues);
    } catch (err) {
      console.error("Error fetching SonarQube results:", err);
    } finally {
      setLoading(false); // 로딩이 끝났음을 표시
    }
  };
  function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return {
      hours: hours,
      minutes: remainingMinutes,
    };
  }
  const { hours, minutes } = convertMinutesToHoursAndMinutes(effortTotal);
  const isDark = useSelector((state) => state.isDark.isDark);

  return (
    <>
      <Navbar />

      {loading ? (
        <div
          style={{
            display: "flex", // Flexbox 레이아웃을 사용
            flexDirection: "column", // 세로로 배치
            justifyContent: "center", // 수직 중앙 정렬
            alignItems: "center", // 수평 중앙 정렬
            height: "100vh", // 부모 div의 높이를 화면 높이와 동일하게 설정
            width: "100vw", // 부모 div의 너비를 화면 너비와 동일하게 설정
            gap: "1rem", // 각 요소 간의 간격을 1rem로 설정
            backgroundColor: isDark
              ? GlobalColor.colors.primary_black
              : "white",
          }}
        >
          <div className={`${style.loader}`}></div>
          <h3
            style={{
              color: isDark ? "white" : GlobalColor.colors.primary_black,
            }}
          >
            {" "}
            소나큐브 분석 결과를 가져오고 있습니다.
          </h3>
          <h5
            style={{
              color: isDark ? "white" : GlobalColor.colors.primary_black,
            }}
          >
            {" "}
            조금만 기다려주세요 🥰{" "}
          </h5>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 80px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "80px",
            backgroundColor: isDark
              ? GlobalColor.colors.primary_black
              : "white",
            transition: "0.3s",
          }}
        >
          <motion.div
            className="col-3"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, type: "easeInOut" }}
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
                backgroundColor: isDark
                  ? GlobalColor.colors.primary_black50
                  : "white",
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
                  flexWrap: "wrap", // 여기에 flex-wrap 속성 추가
                }}
              >
                {" "}
                {hours >= 1 ? (
                  <div>Total Time : {` ${hours}시간 ${minutes}분 `}</div>
                ) : (
                  <div>Total Time : {` ${minutes}분 `}</div>
                )}
                <div>{`${total}`} Issues</div>
                {selectedKeys.length > 0 && (
                  <div className={`${style.changeContainer}`}>
                    {" "}
                    <select
                      name="status"
                      id="status"
                      value={status || "select"} // Set the value to the current status, defaulting to "select"
                      onChange={handleStatusChange} // Attach the event handler here
                      className={
                        isDark ? `${style.selectDark}` : `${style.selectLight}`
                      }
                    >
                      <option value="select">이슈상태를 선택해주세요 ☺️</option>
                      <option value="confirm">Confirm</option>
                      <option value="unconfirm">Unconfirm</option>
                      <option value="reopen">Reopen</option>
                      <option value="resolve">Resolve</option>
                      <option value="falsepositive">False-positive</option>
                      <option value="wontfix">Won't fix</option>
                      <option value="setinreview">Set in review</option>
                      <option value="resolveasreviewed">
                        Resolve as reviewed
                      </option>
                      <option value="resetastoreview">
                        Reset as to review
                      </option>
                      <option value="accept">Accept</option>
                    </select>
                    <button
                      style={{
                        border: isDark
                          ? "2px solid #ccd5f893"
                          : "2px solid #564cad",
                        padding: "7px 10px",
                        borderRadius: "10px",
                        backgroundColor: isDark ? "#757575" : "white",
                        fontSize: "large",
                        color: isDark ? "white" : "black",
                        width: "20%",
                      }}
                      onClick={bulkChange}
                    >
                      변경
                    </button>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  height: "100%",
                  overflowY: "auto",
                  width: "100%",
                }}
              >
                {issues.map((item, index) => (
                  <LeftError
                    isSelect={isSelect}
                    setIsSelect={setIsSelect}
                    key={item.key || index} // Prefer using a unique identifier, falling back to the index if none is available
                    item={item}
                    index={index}
                    isDark={isDark}
                    isSelected={selectedKeys.includes(item.key)}
                    onSelectKey={handleSelectKey}
                  />
                ))}
                <div
                  style={{
                    display: "flex", // Flexbox 레이아웃을 활용
                    justifyContent: "center", // 가로 방향에서 중앙 정렬
                    alignItems: "center", // 세로 방향에서 중앙 정렬
                    height: "100vh", // div의 높이를 전체 뷰포트 높이로 설정
                  }}
                >
                  {addLoading && <div className={`${style.loader2}`}></div>}
                  {!isEnd && !addLoading && (
                    <button
                      style={{
                        fontSize: "20px",
                        boxShadow: "none", // 그림자 제거
                        borderRadius: "5px",
                        border: isDark ? "1px solid" : "1px solid #fff", // 버튼 테두리(선택 사항)
                        color: isDark ? "white" : "black",
                        backgroundColor: isDark
                          ? GlobalColor.colors.primary_black50
                          : "white",
                        borderColor: isDark
                          ? GlobalColor.colors.primary_black50
                          : "white",
                        padding: "5px 10px", // 버튼 내부 패딩(선택 사항)
                        marginBottom: "10px",
                      }}
                      onClick={nextPage}
                    >
                      {" "}
                      더보기{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
            {isSelect && (
              <div
                style={{ marginLeft: "2rem", width: "100%", height: "100%" }}
              >
                <RightError isDark={isDark} isSelect={isSelect} />
              </div>
            )}
          </motion.div>
          {/* <div style={{ marginLeft: "2rem", width: "100%", height: "100%" }}>
            <RightError isDark={isDark} isSelect={isSelect} />
          </div> */}
        </div>
      )}
    </>
  );
};
export default SonarqubePage;
