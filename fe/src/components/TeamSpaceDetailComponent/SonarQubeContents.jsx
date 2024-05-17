import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import style from "./SonarQubeContents.module.css";
import axios from "axios";
import getEnv from "../../utils/getEnv";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CountingComponent from "./CountingComponent";
import FolderComponent from "./FolderComponent";
const num_list = {
  NUM20: [
    "좋은 시작이에요! 첫 단계를 완료했어요!",
    "시작이 반입니다! 계속 진행해봐요!",
    "첫 단계를 성공적으로 완료했어요!",
  ],
  NUM40: [
    "순조롭게 진행 중입니다!",
    "잘하고 있어요! 계속해서 목표를 향해 가고 있어요!",
    "계속 힘내세요! 좋은 진행이에요!",
  ],
  NUM60: [
    "절반을 넘었어요! 계속해서 잘하고 있어요!",
    "굉장해요! 순조롭게 진행 중이에요!",
    "지금까지 훌륭해요! 계속해서 목표를 향해 나아가요!",
  ],
  NUM80: [
    "멋져요! 목표에 가까워지고 있어요!",
    "대단해요! 거의 다 왔어요!",
    "훌륭해요! 이제 조금만 더 가면 목표에 도달해요!",
  ],
  NUM100: [
    "대단해요! 거의 목표에 도달했어요!",
    "마무리가 눈앞이에요! 조금만 더 힘내세요!",
    "끝이 보입니다! 목표 달성이 코앞이에요!",
  ],
};

const SonarQubeContents = () => {
  const [IMP, setIMP] = useState(null); // IMP를 상태로 관리 (선택적)
  const [isPaid, setIsPaid] = useState(true); // isPaid를 상태로 관리
  const [total, setTotal] = useState(0);
  const [openTotal, setOpenTotal] = useState(0);
  const back_url = getEnv("BACK_URL");
  const myCurrentProject = useSelector((state) => state.myCurrentProject.value); //프로젝트
  const projectId = myCurrentProject?.projectId;
  const userInfo = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.isDark.isDark);

  const impUid = null;
  const [folderList, setFolderList] = useState([]);
  const [isFolderLoading, setFolderLoading] = useState(true);
  // 포트원 라이브러리 추가
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    script.onload = () => {
      if (window.IMP) {
        const imp = window.IMP;
        imp.init("imp82875710");
        setIMP(imp); // IMP 상태 업데이트

        console.log(userInfo);
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 결제했는지 체크
  useEffect(() => {
    const isPaidCheck = async () => {
      try {
        const res = await axios.get(`${back_url}/payment/${projectId}`);
        setIsPaid(res.data.isSuccess); // isPaid 상태 업데이트
        if (res.data.isSuccess) {
          getNowState();
        }
      } catch (err) {
        console.error(err);
      }
    };

    isPaidCheck();
  }, [projectId]); // projectId가 변경될 때마다 isPaidCheck 함수 실행
  const getNowState = async () => {
    try {
      const res = await axios.get(`${back_url}/scan/status/${projectId}`, {
        withCredentials: true,
      });
      console.log(res);
      if (!res.data.isSuccess) {
        //결제는 했는데 아직 정적분석을 실행하지 않은상태 ( 이슈가 없는 상태 )
        getFolderList();
        return;
      }
      if (res.data.result.total > 0) {
        setTotal(res.data.result.total);
        setOpenTotal(res.data.result.openTotal);
      } else if (res.data.result.total == 0) {
        //정적분석은 했는데 이슈가 없는상태
        getFolderList();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getFolderList = async () => {
    setFolderLoading(true);
    try {
      const res = await axios.get(`${back_url}/scan-folder/${projectId}`, {
        withCredentials: true,
      });
      setFolderList(res.data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setFolderLoading(false);
    }
  };
  const requestPay = async () => {
    // 함수가 정상적으로 실행되면 true를 반환
    const savePayment = async () => {
      try {
        const res = await axios.post(
          `${back_url}/payment`,
          {
            projectId: projectId,
            paymentAmount: 100,
          },
          { withCredentials: true }
        );
        if (res.data.isSuccess) return true;
        return false;
      } catch (err) {
        console.log(err);
        return false; // 실패 시 false 반환
      }
    };

    const validatePayment = async (impUid) => {
      try {
        const res = await axios.post(
          `${back_url}/payment/validate`,
          {
            projectId: projectId,
            paymentImpUid: impUid,
          },
          { withCredentials: true }
        );
        return res.data.isSuccess;
      } catch (err) {
        console.log(err);
        return false; // 실패 시 false 반환
      }
    };
    // 먼저 savePayment를 실행하여 결제 정보를 저장
    const paymentSaved = await savePayment();

    // savePayment가 성공했을 때에만 IMP.request_pay를 실행
    if (paymentSaved) {
      IMP.request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: "sonar" + uuidv4(), //재사용 불가
          name: "Sinabro : 소나큐브 정적분석",
          amount: 100,
          buyer_email:
            userInfo?.memberEmail == null
              ? "qkslzl101216@naver.com"
              : userInfo?.memberEmail,
          buyer_name: userInfo?.displayName,
        },
        async function (rsp) {
          // 결과를 rsp로 콜백받음
          // 결제 요청이 성공했을 때
          if (rsp.success) {
            console.log(rsp.imp_uid);
            const impUid = rsp.imp_uid;

            // validatePayment 호출하여 결제 검증
            const isPaymentValid = await validatePayment(impUid);
            if (isPaymentValid) {
              Swal.fire(
                "결제 성공",
                "정적분석을 이용하실 수 있어요 ! 😄 ",
                "success"
              );
              setIsPaid(true);
            } else {
              Swal.fire({
                title: "결제 실패",
                text: "다시 요청해주세요.",
                icon: "error",
              });
            }
          } else {
            // 결제 요청이 실패했을 때
            Swal.fire({
              title: "결제 실패",
              text: "다시 요청해주세요.",
              icon: "error",
            });
            console.log(rsp);
          }
        }
      );
    } else {
      console.log("Payment information could not be saved.");
    }
  };
  const getPercentage = () => {
    const t = Math.round(((total - openTotal) / total) * 100);
    return t;
  };
  const getMessage = () => {
    const percentage = getPercentage();
    let messages = [];
    if (percentage <= 20) {
      messages = num_list.NUM20;
    } else if (percentage <= 40) {
      messages = num_list.NUM40;
    } else if (percentage <= 60) {
      messages = num_list.NUM60;
    } else if (percentage <= 80) {
      messages = num_list.NUM80;
    } else {
      messages = num_list.NUM100;
    }

    return messages[Math.floor(Math.random() * messages.length)];
  };
  return (
    <>
      <div className={style.container}>
        {isPaid ? (
          total >= 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{ width: "100%" }}
            >
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: isDark ? "white" : "",
                  }}
                >
                  <span>{getMessage()}</span>
                </div>
                <div
                  className={style.flexContainer}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "10%" }}></div>
                  <p
                    style={{
                      fontSize: "50px",
                      textAlign: "center",
                      marginLeft: "40px",
                      fontFamily: "Pretendard SemiBold",
                      color: isDark ? "white" : "",
                    }}
                  >
                    이슈를
                  </p>
                  <CountingComponent
                    targetNum={getPercentage()}
                  ></CountingComponent>
                  <p
                    style={{
                      fontSize: "50px",
                      textAlign: "center",
                      marginLeft: "10px",
                      fontFamily: "Pretendard SemiBold",
                      color: isDark ? "white" : "",
                    }}
                  >
                    해결하셨어요 !
                  </p>
                  <div style={{ width: "10%" }}></div>
                </div>
                <div
                  className={`${style.divider} ${style.divTransparent} ${style.divArrowDown}`}
                  style={{ marginRight: "30px", marginBottom: "20px" }}
                ></div>
                <button
                  className={style.btn}
                  onClick={() => navigate("/SonarQube")}
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    color: isDark ? "white" : "",
                    backgroundColor: isDark ? "#00ff0000" : "",
                  }}
                >
                  소나큐브 결과 페이지 이동
                </button>

                <div className={style.flexContainer}>
                  <p
                    className={`${style.borderP}`}
                    style={{
                      color: isDark ? "white" : "black",
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>총 이슈 개수</span>
                    <span>{total}</span>
                  </p>

                  <p
                    className={`${style.borderP}`}
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                      borderColor: "#6bda71",
                      color: isDark ? "white" : "black",
                    }}
                  >
                    <span>해결한 이슈 개수</span>
                    <span>{total - openTotal}</span>
                  </p>
                  <p
                    className={`${style.borderP}`}
                    style={{
                      width: "35%",
                      borderColor: "#da6b6d",
                      color: isDark ? "white" : "black",
                      marginRight: "0px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>해결이 필요한 이슈 개수</span>
                    <span>{openTotal}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <h1
                style={{
                  color: isDark ? "white" : "black",
                }}
              >
                정적분석이 실행되지 않았거나,
              </h1>
              <h1
                style={{
                  color: isDark ? "white" : "black",
                  marginBottom: "20px",
                }}
              >
                더 이상 해결할 수 있는 이슈가 없습니다.
              </h1>
              <h5 style={{ color: isDark ? "white" : "black" }}>
                폴더를 선택해 정적분석을 실행해주세요 🥰
              </h5>

              <div
                className={`${style.divider} ${style.divTransparent}  ${
                  isDark ? style.divArrowDownBlack : style.divArrowDown
                }`}
                style={{ marginRight: "30px", marginBottom: "20px" }}
              ></div>
              {isFolderLoading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100px", // 필요에 따라 높이를 조정하세요
                    marginTop: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      color: isDark ? "white" : "black",
                      marginBottom: "10px", // 텍스트와 로더 사이에 간격 추가
                    }}
                  >
                    Git Repository Master 브랜치의 폴더 구조를 가져오고
                    있습니다.
                  </span>
                  <div className={style.loader2}></div>
                </div>
              ) : (
                <FolderComponent folderList={folderList} />
              )}
            </motion.div>
          )
        ) : (
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: isDark ? "white" : "" }}>
              소나큐브를 아직 결제하시지 않으셨군요!
            </h3>
            <h5 style={{ margin: "1em 0", color: isDark ? "white" : "" }}>
              정적분석을 통해서 프로젝트의 결점을 찾아보세요 ☺️
            </h5>
            <img
              className={`${style.sonarImg}`}
              src="/image/sonarQube/sonarQube.gif"
              alt="SonarQube"
              style={{ marginBottom: "20px" }}
            />
            <div
              className="col"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                className={`${style.btn}`}
                onClick={requestPay}
                style={{
                  border: "2px solid",
                  borderRadius: "5px",
                  backgroundColor: isDark ? "#353535" : "",
                  borderColor: isDark ? "white" : "",
                  color: isDark ? "white" : "",
                  padding: "10px 20px",
                }}
              >
                소나큐브 결제하기
              </button>
              <button
                className={`${style.btn}`}
                style={{
                  border: "2px solid",
                  borderRadius: "5px",
                  backgroundColor: isDark ? "#353535" : "",
                  borderColor: isDark ? "white" : "",
                  color: isDark ? "white" : "",
                  padding: "10px 20px",
                }}
              >
                소나큐브 둘러보기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SonarQubeContents;
