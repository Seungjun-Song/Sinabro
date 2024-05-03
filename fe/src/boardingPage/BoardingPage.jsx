import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Section1 from "../components/boarding/Section1";
import Section2 from "../components/boarding/Section2";
import Section3 from "../components/boarding/Section3";
import Section4 from "../components/boarding/Section4";
import Section5 from "../components/boarding/Section5";

const BoardingPage = () => {
  // const section1Ref = useRef(null);
  // const section2Ref = useRef(null);
  // const section3Ref = useRef(null);
  // const section4Ref = useRef(null);

  const [isSecond, setIsSecond] = useState(false);
  const [isThird, setIsThird] = useState(false);
  const [isFourth, setIsFourth] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition >=890){
      setIsThird(true)
    }else{
      setIsThird(false)
    }

    console.log("Scroll position:", scrollPosition);
  };
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
        <Section1 />
        <Section2 />
        {isThird && <Section3 />}
        {/* <Section4 /> */}
        <Section5/>
      </div>
    </>
  );
};

export default BoardingPage;
