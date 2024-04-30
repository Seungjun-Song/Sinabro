import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence, motion } from "framer-motion";

const SimpleSlider = () => {
  const [isHover, setIsHover] = useState(false);
  function SamplePrevArrow(props) {
    const { className, style, onClick, isHover } = props;

    return (
      isHover && (
        <motion.div
          className="shadow"
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // 여기서 exit 설정
          transition={{ duration: 0.5 }}
          whileHover={{ cursor: "pointer" }}
          style={{
            width: "3rem",
            height: "3rem",
            backgroundColor: "white",
            position: "absolute",
            borderRadius: "1.5rem",
            left: "-2%",
            top: "8.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <img
            style={{
              width: "0.5rem",
              height: "1rem",
              transform: "scaleX(-1)",
            }}
            src="/images/right_slider.png"
          />
        </motion.div>
      )
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick, isHover } = props;

    return (
      <AnimatePresence>
        {isHover && (
          <motion.div
            className="shadow"
            onClick={onClick}
            initial={{ opacity: 0 }} // 초기 상태에서 opacity를 0으로 설정
            animate={{ opacity: 1 }} // 나타날 때 opacity를 1로 설정
            exit={{ opacity: 0 }} // 사라질 때 opacity를 0으로 설정
            transition={{ duration: 0.5 }} // 애니메이션에 걸리는 시간을 설정
            whileHover={{ cursor: "pointer" }}
            style={{
              width: "3rem",
              height: "3rem",
              backgroundColor: "white",
              position: "absolute",
              borderRadius: "1.5rem",
              right: "-2%",
              top: "8.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 99,
            }}
          >
            <img
              style={{
                width: "0.5rem",
                height: "1rem",
              }}
              src="/images/right_slider.png"
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: true,
    nextArrow: <SampleNextArrow isHover={isHover} />,
    prevArrow: <SamplePrevArrow isHover={isHover} />,
  };

  return (
    <motion.div
      style={{ position: "relative" }}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      {/* <h2>Simple Slider</h2> */}
      <Slider {...settings}>
        <div>
          <img
            style={{ width: "100%", height: "20rem" }}
            src="/images/beside1.png"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "20rem" }}
            src="/images/beside2.png"
          />
        </div>
      </Slider>
      <div style={{ position: "absolute" ,bottom:"2rem",right:"2rem" }}>asdf</div>
    </motion.div>
  );
};

export default SimpleSlider;
