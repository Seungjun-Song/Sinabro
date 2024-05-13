import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import style from "./SonarQubeContents.module.css";
import axios from "axios";
import getEnv from "../../utils/getEnv";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const SonarQubeContents = () => {
  const [IMP, setIMP] = useState(null); // IMP를 상태로 관리 (선택적)
  const [isPaid, setIsPaid] = useState(true); // isPaid를 상태로 관리
  const back_url = getEnv("BACK_URL");
  const myCurrentProject = useSelector((state) => state.myCurrentProject.value); //프로젝트
  const userInfo = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  var projectId = myCurrentProject?.projectId;
  var impUid;
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
      } catch (err) {
        console.error(err);
      }
    };

    isPaidCheck();
  }, [projectId]); // projectId가 변경될 때마다 isPaidCheck 함수 실행
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

  return (
    <>
      <div className={style.container}>
        {isPaid ? (
          <div>
            <button onClick={() => navigate("/SonarQube")}>
              {" "}
              소나큐브 결과 페이지 이동
            </button>
          </div>
        ) : (
          <div>
            <h3>소나큐브를 아직 결제하시지 않으셨군요!</h3>
            <h5 className="m-3">
              정적분석을 통해서 프로젝트의 결점을 찾아보세요 ☺️
            </h5>
            <img
              className={`${style.sonarImg}`}
              src="/image/sonarQube/sonarQube.gif"
              alt="SonarQube"
            />
            <div className="col">
              <button
                className={`${style.btn}`}
                onClick={requestPay}
                style={{ marginLeft: "60px" }}
              >
                소나큐브 결제하기
              </button>
              <button className={`${style.btn}`}>소나큐브 둘러보기</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SonarQubeContents;
