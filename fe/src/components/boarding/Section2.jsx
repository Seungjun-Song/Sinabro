import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faCode,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const Section2 = ({ section2Ref }) => {
  const [currentSlideNumber, setCurrentSlideNumber] = useState(1);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
  };
  return (
    <>
      <div
        ref={section2Ref}
        style={{
          width: "95%",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          marginBottom: "10rem",
        }}
      >
        <motion.div
          // animate={{ opacity: 1 }}
          // initial={{ opacity: 0 }}
          // exit={{ opacity: 0 }}
          // transition={{ duration: 0.3, delay: 0.6 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            filter: "blur(150px)",
            width: "15rem",
            height: "15rem",
            zIndex: -1,
            backgroundColor: "#8800ff",
          }}
        ></motion.div>
        <motion.div
          // animate={{ opacity: 1 }}
          // initial={{ opacity: 0 }}
          // exit={{ opacity: 0 }}
          // transition={{ duration: 0.3, delay: 0.6 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "90%",
            filter: "blur(150px)",
            width: "10rem",
            height: "10rem",
            zIndex: -1,
            backgroundColor: "#8800ff",
          }}
        ></motion.div>
        <div className="col-5" style={{ padding: "1rem" }}>
          <h1 style={{ fontSize: "3.5rem" }}>나에게 </h1>
          <h1 style={{ fontSize: "3.5rem" }}> 꼭 맞는 </h1>
          <h1 style={{ fontSize: "3.5rem" }}> 프로젝트 </h1>
          <h1 style={{ fontSize: "3.5rem" }}> 지금 시작해보세요</h1>
          <div
            style={{
              height: "15rem",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              className="shadow"
              style={{
                backgroundColor: currentSlideNumber == 1 ? "#1774d0" : "white",
                width: "30%",
                borderRadius: "1rem",
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                flexDirection: "column",
                padding: "2rem",
                transition: "0.5s",
              }}
            >
              <h5
                style={{ color: currentSlideNumber == 1 ? "white" : "#1774d0" }}
              >
                01
              </h5>
              <h5
                style={{ color: currentSlideNumber == 1 ? "white" : "black" }}
              >
                <div>협업</div>
                <div>프로젝트</div> 
                공간
              </h5>
            </div>
            <div
              className="shadow"
              style={{
                backgroundColor: currentSlideNumber == 2 ? "#1774d0" : "white",
                width: "30%",
                borderRadius: "1rem",
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                flexDirection: "column",
                padding: "2rem",
                transition: "0.5s",
              }}
            >
              <h5
                style={{ color: currentSlideNumber == 2 ? "white" : "#1774d0" }}
              >
                02
              </h5>
              <h5
                style={{ color: currentSlideNumber == 2 ? "white" : "black" }}
              >
                <div>라이브</div> 
                피드백
              </h5>
            </div>
            <div
              className="shadow"
              style={{
                backgroundColor: currentSlideNumber == 3 ? "#1774d0" : "white",
                width: "30%",
                borderRadius: "1rem",
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                flexDirection: "column",
                padding: "2rem",
                transition: "0.5s",
              }}
            >
              <h5
                style={{ color: currentSlideNumber == 3 ? "white" : "#1774d0" }}
              >
                03
              </h5>
              <h5
                style={{ color: currentSlideNumber == 3 ? "white" : "black" }}
              >
                <div>정적 코드</div>
                 분석
              </h5>
            </div>
          </div>
        </div>

        <div className="col-7">
          <motion.div
            style={{
              position: "relative",
              backgroundColor: "#f2f9ff",
              padding: "5rem",
              borderRadius: "2rem",
              //   alignItems: "center",
              //   height: "80%",
            }}
          >
            {/* <h2>Simple Slider</h2> */}
            <Slider
              {...settings}
              beforeChange={(currentSlide, nextSlide) =>
                setCurrentSlideNumber(nextSlide + 1)
              }
            >
              {" "}
              <div>
                <div
                  style={{
                    height: "30rem",
                    margin: "auto",
                    position: "relative",
                  }}
                >
                  <h5 style={{ color: "#1774d0" }}>01</h5>
                  <h1
                    style={{
                      fontWeight: "bold",
                      marginBottom: "2rem",
                      fontSize: "3rem",
                    }}
                  >
                    협업 프로젝트 공간
                  </h1>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <FontAwesomeIcon icon={faGithub} size="xl" />
                    <h5 style={{ margin: 0 }}>
                      Git 연동을 통하여 손 쉬운 Git관리
                    </h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <img
                      src="/images/vscode.png"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                    <h5 style={{ margin: 0 }}>
                      VsCode환경에서 진행되는 프로젝트
                    </h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <FontAwesomeIcon icon={faHeadset} size="xl" />
                    <h5 style={{ margin: 0 }}>
                      음성채팅을 통한 실시간으로 팀원과 소통
                    </h5>
                  </div>
                  {/* <h5>전문적인 피드백을 통하여 실력 향상</h5> */}
                  <h5
                    style={{
                      color: "#565656",
                      fontSize: "1rem",
                      margin: 0,
                      lineHeight: "1.5rem",
                    }}
                  >
                    팀원과 실시간으로 소통하면서 프로젝트를 진행하세요!
                  </h5>
                  <h5
                    style={{
                      color: "#565656",
                      fontSize: "1rem",
                      margin: 0,
                      lineHeight: "1.5rem",
                    }}
                  >
                    인터넷이 되는 환경이라면 어디서든 프로젝트에 참여가
                    가능합니다!
                  </h5>
                  <img
                    src="/images/service_instagram.png"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      zIndex: -1,
                      width: "30rem",
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    height: "30rem",
                    margin: "auto",
                    position: "relative",
                  }}
                >
                  <h5 style={{ color: "#1774d0" }}>02</h5>
                  <h1
                    style={{
                      fontWeight: "bold",
                      marginBottom: "2rem",
                      fontSize: "3rem",
                    }}
                  >
                    라이브 피드백
                  </h1>

                  <h5>프로젝트 공간으로 초대해서 피드백 진행</h5>
                  <h5>따로 깃허브 주소나,로컬로 파일을 다운받지 않아도 가능</h5>
                  <h5>실시간으로 코드를 통한 피드백을 받을 수 있음</h5>
                  {/* <h5>전문적인 피드백을 통하여 실력 향상</h5> */}
                  <h5
                    style={{
                      color: "#565656",
                      fontSize: "1rem",
                      margin: 0,
                      lineHeight: "1.5rem",
                    }}
                  >
                    코드 피드백을 통하여 자신과 남의 코드를 비교 해보세요
                  </h5>
                  <h5
                    style={{
                      color: "#565656",
                      fontSize: "1rem",
                      margin: 0,
                      lineHeight: "1.5rem",
                    }}
                  >
                    코드에는 100%정답이 없습니다. 각자의 방법을 존중하며 최적의
                    방향을 설정하세요
                  </h5>
                  <img
                    src="/images/service_site.png"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      zIndex: -1,
                      width: "30rem",
                    }}
                  />
                </div>
              </div>
              {/* {2번} */}
              <div>
                <div
                  style={{
                    height: "30rem",
                    margin: "auto",
                    position: "relative",
                  }}
                >
                  <h5 style={{ color: "#1774d0" }}>03</h5>
                  <h1
                    style={{
                      fontWeight: "bold",
                      marginBottom: "2rem",
                      fontSize: "3rem",
                    }}
                  >
                    정적 코드 분석
                  </h1>

                  <h5>SonarQube를 통한 정적 코드 분석 결과 확인 가능</h5>
                  <h5>초보자에게 명확한 표지판</h5>
                  <h5>전문적인 피드백을 통하여 실력 향상</h5>
                  <h5
                    style={{
                      color: "#565656",
                      fontSize: "1rem",
                      margin: 0,
                      lineHeight: "1.5rem",
                    }}
                  >
                    소나큐브란 소스코드품질 현황을 가시화,리스크
                    분석,소스코드에서 발생하는
                  </h5>
                  <h5
                    style={{
                      color: "#565656",
                      fontSize: "1rem",
                      margin: 0,
                      lineHeight: "1.5rem",
                    }}
                  >
                    문제를 해결함을로써 소프트웨어 비즈니스를 위해 반드시 필요한
                    솔루션 입니다.
                  </h5>
                  <img
                    src="/images/service_backlink.png"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      zIndex: -1,
                      width: "30rem",
                    }}
                  />
                </div>
              </div>
              {/* {3번} */}
            </Slider>

            {/* <div
              style={{
                backgroundColor: "rgba(0, 0, 0, .3)",
                fontSize: "0.8rem",
                color: "white",
                borderRadius: "1rem",
                padding: "0.4rem 1rem ",
                position: "absolute",
                bottom: "2rem",
                right: "2rem",
                display: "flex",
                gap: "0.2rem",
              }}
            >
              <AnimatedNumber
          transitions={(index) => ({
            type: "spring",
            duration:1,
          })}
          animateToNumber={currentSlideNumber}
        />
              <motion.div
                initial={{ opacity: 0 }} // 초기 상태 설정
                animate={{ opacity: 1 }} // 애니메이션 설정
                transition={{ duration: 0.5 }} // 애니메이션 지속 시간 설정
              >
                {currentSlideNumber}
              </motion.div>
              <div>/</div>
              <div>3</div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default Section2;
