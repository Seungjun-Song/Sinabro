import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalColor } from "../../services/color";
const DUMMY_DATA = [
  {
    id: 1,
    state: "모집중",
    projectname: "시나브로",
    message: "열심히 하실 백엔드 123명 구해요!",
  },
  {
    id: 2,
    state: "모집중",
    projectname: "시나브로",
    message: "열심히 하실 백엔드 99명 구해요!",
  },
  {
    id: 3,
    state: "모집중",
    projectname: "시나브로",
    message: "열심히 하실 백엔드 3명 구해요!",
  },
  {
    id: 4,
    state: "모집중",
    projectname: "시나브로",
    message: "열심히 하실 백엔드 2명 구해요!",
  },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{ ...style, display: "block", background: "red", opacity: 0 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{ ...style, display: "block", background: "green", opacity: 0 }}
      onClick={onClick}
    />
  );
}
function CustomSlide({id,state,projectname,message,isDark}) {
  return (
    <div
      //   className="shadow"
      style={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        height: "5rem",
        gap: "2rem",
        borderRadius:"1rem",
        backgroundColor:isDark ? GlobalColor.colors.primary_black50 : "white"
      }}
    >
      <div
        className="py-2"
        style={{
          borderRadius: "1rem",
          paddingRight: "2rem",
          paddingLeft: "2rem",
          backgroundColor: "#909EE7",
          color: "white",
        }}
      >
        {" "}
        {state}
      </div>
      <div style={{fontWeight:"bold" , fontSize:"1.2rem" , color: isDark? "white" : "black"}}>{projectname}</div>
      {/* <div style={{marginLeft:"0.1rem"}}></div> */}
      <div style={{fontSize:"1.2rem"  ,color: isDark? "white" : "black"}} >{message}</div>
    </div>
  );
}
const VerticalSlider = ({isDark}) => {
  const settings = {
    // dots: true,
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplaySpeed: 3000,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div
      className="shadow mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? GlobalColor.colors.primary_black50: "white",
        borderRadius: "1rem",
        height: "5rem",
        
      }}
    >
      <Slider {...settings}>
        {DUMMY_DATA.map((item,index) =>(
            <CustomSlide isDark={isDark} key={index}  id={item.id} projectname={item.projectname} state={item.state} message={item.message} />
        ))}
      </Slider>
    </div>
  );
};

export default VerticalSlider;
