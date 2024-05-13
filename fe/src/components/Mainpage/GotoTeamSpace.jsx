import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faRightLong,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalColor } from "../../services/color";
import { useNavigate } from "react-router-dom";

const ideas = [
  "시나브로를 통하면 프로젝트를 쉽게 만들수 있어요",
  "소나큐브를 통해서 정적 코드 분석을 받아보세요",
  "팀을 구하고 프로젝트를 진행해보세요",
  "팀원과 일정을 공유하고 계획적인 프로젝트를 진행해요",
];
export default (props) => {
  const [activeSlide, setactiveSlide] = useState(props.activeSlide);
  const [isHover, setIsHover] = useState(false);
  const [index, setIndex] = useState(0);
  const next = () =>
    activeSlide < props.data.length - 1 && setactiveSlide(activeSlide + 1);

  const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);

  const getStyles = (index) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-200px) rotateY(40deg)",
        zIndex: 9,
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-200px) rotateY(-40deg)",
        zIndex: 9,
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-300px) rotateY(50deg)",
        zIndex: 8,
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-300px) rotateY(-50deg)",
        zIndex: 8,
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ideas.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [ideas.length]);
  return (
    <>
      {/* carousel */}
      <div
        className="shadow"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3rem",
          marginBottom: "3rem",
          padding: "3rem",
          borderRadius: "0.75rem",
          backgroundColor: props.isDark
            ? GlobalColor.colors.primary_black50
            : "white",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <motion.h5
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: props.isDark ? "white" : "black",
            }}
          >
            {props.data.length == 0
              ? "알고 계셨나요?"
              : "나의 팀스페이스로 이동"}
          </motion.h5>
          <AnimatePresence>
            {isHover && (
              <motion.div
                style={{
                  marginLeft: "1rem",
                  color: props.isDark ? "white" : "black",
                }}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={faArrowRight} size="xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {props.data.length !== 0 && (
          <div className="slideC">
            {props.data.map((item, i) => (
              <React.Fragment key={item.projectId}>
                <motion.div
                  whileHover={{
                    cursor: "pointer",
                    boxShadow: `8px 8px 24px ${
                      props.isDark
                        ? "rgba(255, 255, 255,0.2)"
                        : "rgba(0, 0, 0, 0.3)"
                    } `,
                  }}
                  transition={{ duration: 0.3 }}
                  className="slide"
                  style={{
                    // background: item.bgColor,
                    // boxShadow: `0 5px 20px ${item.bgColor}30`,
                    ...getStyles(i),
                  }}
                >
                  <SliderContent {...item} />
                </motion.div>
                {!props.isDark && (
                  <div
                    className="reflection"
                    style={{
                      backgroundImage: `linear-gradient(to bottom,  rgba(255, 255, 255, 0.678), rgb(255, 255, 255)), url('${item.projectImg}')`,
                      transform: "scaleY(-1)",
                      ...getStyles(i),
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <AnimatePresence mode="wait">
          {props.data.length == 0 && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: "100%", fontSize: "1.5rem" }}
            >
              {ideas[index]}
            </motion.div>
          )}
        </AnimatePresence>
        {/* carousel */}
        {props.data.length !== 0 && (
          <div style={{ marginTop: "3rem", zIndex: 99 }} className="btns">
            <FontAwesomeIcon
              className="btn"
              onClick={prev}
              icon={faChevronLeft}
              style={{
                color: props.isDark ? "#fff" : GlobalColor.colors.primary_black,
              }}
              size="2x"
            />
            <FontAwesomeIcon
              className="btn"
              onClick={next}
              icon={faChevronRight}
              style={{
                color: props.isDark ? "#fff" : GlobalColor.colors.primary_black,
              }}
              size="2x"
            />
          </div>
        )}
      </div>
    </>
  );
};

const SliderContent = (props) => {
  //   console.log(props);
  return (
    <div className="sliderContent">
      <img style={{ width: "12rem", height: "12rem" }} src={props.projectImg} />
    </div>
  );
};
