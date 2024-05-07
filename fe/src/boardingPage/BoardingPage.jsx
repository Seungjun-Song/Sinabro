import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Section1 from "../components/boarding/Section1";
import Section2 from "../components/boarding/Section2";
import Section3 from "../components/boarding/Section3";
import Section4 from "../components/boarding/Section4";
import Section5 from "../components/boarding/Section5";
import "./styles.css"
const BoardingPage = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const [whereref, setwhereref] = useState(1)
  const setctionlist = [
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
  ]
  const [isSecond, setIsSecond] = useState(false);
  const [isThird, setIsThird] = useState(false);
  const [isFourth, setIsFourth] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);

  const scrollToSection = () => {
    if (setctionlist[whereref] && setctionlist[whereref].current) {
      setctionlist[whereref].current.scrollIntoView({ behavior: 'smooth' });
    }
    setwhereref(whereref + 1)
    console.log(whereref)

  };


  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= 890) {
      setIsThird(true)
    } else {
      setIsThird(false)
    }

    console.log("Scroll position:", scrollPosition);
  };
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          //   justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",

        }}
      >
        <button style={{ position: "fixed", bottom: "10%", zIndex: 9999 }} onClick={() => scrollToSection(section2Ref)}>Go to Section 2</button>
        <Section1 />
        <Section2 section2Ref={section2Ref} />
        {isThird && <Section3  />}
        {!isThird && <div ref={section3Ref} style={{
          height: "100vh",
          width: "100%",
        }} ></div>}
        {/* <Section4 /> */}
        <Section5 section4Ref={section4Ref} />
        <motion.div className="progress-bar" style={{ scaleX }} />
      </div>
    </>
  );
};

export default BoardingPage;
