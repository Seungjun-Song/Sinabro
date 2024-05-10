import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useIsPresent,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpLong } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { logInLocal, logInServer } from "../../oauthTestPage/OauthTest";
const Section5 = ({ section4Ref ,setScroll,scroll }) => {
  // const [scroll, setScroll] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [isTogether, setIsTogether] = useState(false);
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const image = document.querySelector(".scaling-image");
      if (scrollPosition >= 2372) {
        setScroll(true);
      } else {
        setScroll(false);
      }
      // 스크롤 위치에 따라 이미지의 크기 조절
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 처음으로 렌더링될 때만 실행
  const handleClick = () => {
    navigate("/Mainpage");
  };
  useEffect(() => {
    let interval;
    if (hovering) {
      interval = setInterval(() => {
        setHoverTime((prevTime) => prevTime + 1);
      }, 20); // 1초마다 증가
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [hovering]);

  const handleHoverStart = () => {
    setHovering(true);
  };
  const handleHoverEnd = () => {
    setHovering(false);
    setHoverTime(0); // 호버가 끝나면 시간을 초기화합니다.
  };
  useEffect(() => {
    if (hoverTime >= 150) {
      setIsClick(true);
    }
  }, [hoverTime]);
  return (
    <>
      <motion.div
        ref={section4Ref}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          // backgroundColor: isClick ? "#4c5fadc5" : "transparent",
          backgroundColor: !isClick && scroll  ? "#FEF5EE" :"white",
          transition: "0.3s",
          // zIndex:-2
        }}
        transition={{ duration: 0.3 }} // 애니메이션 효과 설정
        // layout // 레이아웃 변경 애니메이션
        // onClick={() => setIsClick(!isClick)}
      >
        {scroll && !isClick && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "15rem",
              // height: "10%",
              top: "calc(50% + 10rem)", // 50%에서 10rem을 뺍니다.
              position: "absolute",
              left: "calc(50% - 7.5rem)",
              zIndex: 10,
              backgroundColor: hoverTime >= 101 ? "#4c5fad" : "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem 1rem",
              // mixBlendMode:"",
              // transform: "translate(-50%, -50%)",
              transition: "0.3s",
              color: hoverTime >= 101 ? "white" : "#4c5fad",
              borderColor: hoverTime >= 101 ? "white" : "#4c5fad",
              border: "solid 3px",
              borderRadius: "5rem",
              gap: "1rem",
            }}
          >
            {hoverTime === 0 && "Click HERE"}
            {hoverTime > 0 && hoverTime < 101 && `${hoverTime}%`}
            {hoverTime >= 101 && "Perfect!"}
            {hoverTime === 0 && <FontAwesomeIcon size="lg" icon={faUpLong} />}
          </motion.div>
        )}
        {scroll && !isClick && (
          <motion.div
            layout
            transition={{ duration: 0.5 }}
            style={{
              opacity: hoverTime / 100,
              zIndex: 1,
              top: "calc(50% -10rem)", // 50%에서 10rem을 뺍니다.
              position: "absoulte",
              left: "calc(50% -10rem)", // 50%에서 10rem을 뺍니다.
              width: "15rem",
              height: "15rem",
              backgroundColor: "#4c5fad",
              filter: "blur(100px)",

            }}
          ></motion.div>
        )}
        <motion.div
          layout
          className="isClick"
          data-isOpen={isClick}
          transition={{ duration: 0.5 }}
          onHoverStart={() => handleHoverStart()}
          onHoverEnd={() => handleHoverEnd()}
          // style={{
          //   zIndex: 2,
          //   top: "50%",
          //   position: "absoulte",
          //   left: "50%",
          //   // width:"auto",
          //   // height:"auto",
          // }}
        >
          {scroll && !isClick && (
            <motion.img
              className={isClick ? "" : "scaling-image"}
              style={{ width: "15rem", cursor: "pointer" }}
              src="/image/nav/sinabro_logo.png"
              alt="Sinabro"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsClick(!isClick)}
              transition={{ duration: "0.8", type: "ease" }}
            />
          )}
        </motion.div>
      
        <AnimatePresence>
          {scroll && !isClick && (
            <motion.img
              transition={{ ease: "easeIn", duration: 0.4 }}
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              style={{ zIndex: 1, bottom: 0, left: 0, position: "absolute"  }}
              src="/images/triangle.png"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {scroll && !isClick && (
            <motion.img
              transition={{ ease: "easeIn", duration: 0.4 }}
              initial={{ y: -200, opacity: 0, rotate: 180 }}
              animate={{ y: 0, opacity: 1, rotate: 180 }}
              exit={{ x: 200, opacity: 0 }}
              style={{ zIndex: 1, top: 0, right: 0, position: "absolute" }}
              src="/images/triangle.png"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isClick && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                style={{ fontSize: "3.5rem", display: "flex" }}
              >
                <div style={{ color: "#f7bd2c" }}>"</div>
                <div style={{ color: "rgba(86, 76, 173, 1)" }}>시나브로</div>
                <div style={{ color: "#f7bd2c" }}>"</div>와 함께
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 1.8 }}
                style={{ fontSize: "3.5rem" }}
              >
                새로운 팀원과
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 3 }}
                style={{ fontSize: "3.5rem" }}
              >
                새로운 프로젝트를
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {isClick && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              filter: "blur(100px)",
              width: "10rem",
              height: "10rem",

              backgroundColor: "#bb19d4",
            }}
          ></motion.div>
        )}
        {isClick && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 2 }}
            style={{
              position: "absolute",
              top: "42%",
              left: "18%",
              filter: "blur(150px)",
              width: "15rem",
              height: "15rem",

              backgroundColor: "#6f0bcc",
            }}
          ></motion.div>
        )}
        {isClick && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 3 }}
            style={{
              position: "absolute",
              top: "70%",
              left: "70%",
              filter: "blur(150px)",
              width: "15rem",
              height: "15rem",

              backgroundColor: "#280bcc",
            }}
          ></motion.div>
        )}
        {isClick && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 3.6 }}
            // whileHover={{ cursor: "pointer" }}
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            onClick={() => logInServer()} //,
            // onClick={() => logInLocal()} //,
            style={{
              padding: " 1.5rem 4rem",
              // height: "5rem",
              // width: "10rem",
              display: "flex",
              // border: "3px solid black",
              borderRadius: "5rem",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(86, 76, 173)",
              color: "white",
              gap: "1rem",
              fontSize: "1.2rem",
              cursor: "pointer",
              zIndex: 9,
            }}
          >
            함께하기
            <motion.div animate={{ x: isHover ? 10 : 0 }}>
              <FontAwesomeIcon icon={faArrowRight} color="white" size="lg" />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Section5;
