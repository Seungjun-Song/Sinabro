import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { logIn } from "../../oauthTestPage/OauthTest";
import { useNavigate } from "react-router-dom";
const Section3 = ({ section3Ref ,scroll,setScroll }) => {
  const [isHover, setIsHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate()

  const imglist = [
    "images/page1.png",
    "images/page2.png",
    "images/page3.png",
    "images/page4.png",
    "images/page5.png",
    "images/page6.png",
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 다음 이미지로 이동
      setCurrentIndex((prevIndex) =>
        prevIndex === imglist.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5초마다 변경

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 인터벌 제거
  }, []);
  const cardVariants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
    },
  };
  return (
    <>
      <motion.div
        ref={section3Ref}
        variants={cardVariants}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          style={{
            // zIndex: -1,
            filter: "blur(3px)",
            width: "8rem",
            position: "absolute",
            top: "60%",
            left: "25%",
          }}
          src="/images/vue.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 2 }}
          style={{ zindex: -1, position: "absolute", top: "80%", left: "60%" }}
          src="/images/choi.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          style={{
            width: "7rem",
            zindex: -1,
            position: "absolute",
            top: "85%",
            left: "0%",
            filter: "blur(3px)",
          }}
          src="/images/css.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 1 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "60%",
            left: "40%",
            width: "7rem",
            filter: "blur(1px)",
          }}
          src="/images/django.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          style={{ zindex: -1, position: "absolute", top: "80%", left: "50%" }}
          src="/images/githublogo.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 1 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "10%",
            left: "10%",
            filter: "blur(3px)",
            width: "6rem",
          }}
          src="/images/html.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 1.1 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "5%",
            left: "30%",
            filter: "blur(1px)",
          }}
          src="/images/java.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "30%",
            left: "40%",
            filter: "blur(1px)",
          }}
          src="/images/jeon.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "80%",
            left: "30%",
            width: "6rem",
            filter: "blur(1px)",
          }}
          src="/images/js.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "70%",
            left: "80%",
            filter: "blur(1px)",
          }}
          src="/images/kim.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          style={{ zindex: -1, position: "absolute", top: "10%", left: "60%" }}
          src="/images/park.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 1.1 }}
          style={{ zindex: -1, position: "absolute", top: "68%", left: "50%" }}
          src="/images/park1.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "5%",
            left: "50%",
            width: "5rem",
            filter: "blur(1px)",
          }}
          src="/images/python.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "8%",
            left: "20%",
            filter: "blur(3px)",
            width: "7rem",
          }}
          src="/images/react.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          style={{ zindex: -1, position: "absolute", top: "13%", left: "80%" }}
          src="/images/song.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          style={{
            zindex: -1,
            position: "absolute",
            top: "80%",
            left: "10%",
            width: "7rem",
            filter: "blur(1px)",
          }}
          src="/images/spring.png"
        />
        <motion.img
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          style={{
            width: "5rem",
            zindex: -1,
            position: "absolute",
            top: "45%",
            left: "45%",
            filter: "blur(1px)",
          }}
          src="/images/vscode.png"
        />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          // exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, delay: 1.3 }}
          style={{
            position: "absolute",
            top: "35%",
            left: "25%",
            width: "10rem",
            height: "10rem",
            backgroundColor: "#1e00ff",
            zIndex: -2,
            filter: "blur(150px)",
          }}
        ></motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.3 }}
          style={{
            position: "absolute",
            top: "35%",
            left: "75%",
            width: "10rem",
            height: "10rem",
            backgroundColor: "#8800ff",
            zIndex: -2,
            filter: "blur(150px)",
          }}
        ></motion.div>
        <div style={{ width: "90%", display: "flex", height: "100%" }}>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              //   backgroundColor: "white",
              zIndex: 1,
            }}
          >
            <motion.div style={{ display: "flex", gap: "2rem" }}>
              <motion.h1
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                // exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, delay: 1.3 }}
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "#1774d0",
                }}
              >
                안들리세요?
              </motion.h1>
              <motion.img
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                // exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, delay: 1.5 }}
                src="/images/up.png"
                style={{ width: "4.5rem", height: "5rem" }}
              />
            </motion.div>
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              // exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, delay: 1.5 }}
              style={{ fontSize: "3rem", fontWeight: "bold" }}
            >
              실력 오르는 소리
            </motion.h1>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              // exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, delay: 1.7 }}
              style={{ fontSize: "1rem" }}
            >
              개발자 성장을 위한 최고의 파트너, 실제 고객들의 후기로 증명합니다!
            </motion.div>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              // exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, delay: 1.9 }}
              style={{
                marginTop: "2rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <h5 style={{ fontSize: "1rem", margin: 0 }}>
                #프로젝트 #라이브코딩 #코드평가 #함께해요 #시나브로
              </h5>

              <img src="/images/icn_like.png" />
            </motion.div>
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              // exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 2.1 }}
              onHoverStart={() => setIsHover(true)}
              onHoverEnd={() => setIsHover(false)}
              style={{
                cursor: "pointer",
                padding: " 1.5rem 4rem",
                // height: "5rem",
                width: "15rem",
                display: "flex",
                // border: "3px solid black",
                borderRadius: "5rem",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(86, 76, 173)",
                color: "white",
                gap: "1rem",
                fontSize: "1.2rem",
              }}
              onClick={() => navigate('/callback')}
            >
              시작하기
              <motion.div animate={{ x: isHover ? 5 : 0 }}>
                <FontAwesomeIcon icon={faArrowRight} color="white" size="lg" />
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0 }}
            transition={{ delay: 2.3 }}
            style={{
              width: "50%",
              display: "flex",
              position: "relative",
              height: "100%",
            }}
          >
            <img
              style={{
                width: "28rem",
                height: "15.5rem",
                position: "absolute",
                top: "30%",
                left: "20%",
              }}
              src="/images/pngwing.com.png"
            />
            {/* {currentIndex === 0  && } */}
            <AnimatePresence mode="wait">
              <motion.img
                style={{
                  width: "26.2rem",
                  // height: "16rem",
                  position: "absolute",
                  top: "31.1%",
                  left: "22.2%",
                }}
                src={imglist[currentIndex]}
                key={imglist[currentIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
export default Section3;
