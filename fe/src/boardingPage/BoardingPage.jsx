import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Section1 from "../components/boarding/Section1";
import Section2 from "../components/boarding/Section2";
import Section3 from "../components/boarding/Section3";
import Section4 from "../components/boarding/Section4";
import Section5 from "../components/boarding/Section5";
import "./styles.css";
import SectionButton from "../components/boarding/SectionButton";
const BoardingPage = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const [whereref, setwhereref] = useState(1);
  const setctionlist = [section1Ref, section2Ref, section3Ref, section4Ref];
  const [isThird, setIsThird] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);

  const scrollToSection = () => {
    if (setctionlist[whereref] && setctionlist[whereref].current) {
      setctionlist[whereref].current.scrollIntoView({ behavior: "smooth" });
    }
    setwhereref(whereref + 1);
    console.log(whereref);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= 890) {
      setIsThird(true);
    } else {
      setIsThird(false);
    }

    console.log("Scroll position:", scrollPosition);
  };
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
        <AnimatePresence>
          {whereref !== 4 && !scroll&& (
            <motion.div
              onClick={scrollToSection}
              onHoverStart={() => setIsHover(true)}
              onHoverEnd={() => setIsHover(false)}
              style={{
                scale: isHover ? 1.05 : 1,
                opacity: isHover ? 1 : 0.5,
                position: "fixed",
                bottom: "2rem",
                // left: "calc(50% -5rem)",
                zIndex: 99,
                width: "10rem",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "0.5s",
              }}
            >
              <motion.div
                key="Click"
                style={{ fontWeight: "bold" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Click Here
              </motion.div>

              <SectionButton />
            </motion.div>
          )}
        </AnimatePresence>

        <Section1 />
        <Section2 section2Ref={section2Ref} />
        {isThird && <Section3  />}
        {!isThird && (
          <div
            ref={section3Ref}
            style={{
              height: "100vh",
              width: "100%",
            }}
          ></div>
        )}
        {/* <Section4 /> */}

        <Section5 section4Ref={section4Ref}  setScroll={setScroll} scroll={scroll} />

        <motion.div className="progress-bar" style={{ scaleX }} />
      </div>
    </>
  );
};

export default BoardingPage;
