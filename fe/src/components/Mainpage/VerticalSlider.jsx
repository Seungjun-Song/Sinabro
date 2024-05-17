import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalColor } from "../../services/color";
import axios from "axios";
import getEnv from "../../utils/getEnv";
import { useNavigate } from "react-router-dom";
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
function CustomSlide({ id, navigate, projectname, message, isDark }) {
  return (
    <div
      //   className="shadow"
      onClick={() =>
        navigate("/communityDetail", {
          state: { kind: { id: 401, name: "member" }, postId: id },
        })
      }
      style={{
        cursor: "pointer",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        height: "5rem",
        gap: "2rem",
        borderRadius: "1rem",
        backgroundColor: isDark ? GlobalColor.colors.primary_black50 : "white",
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
        모집중
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: isDark ? "white" : "black",
        }}
      >
        {projectname}
      </div>
      {/* <div style={{marginLeft:"0.1rem"}}></div> */}
      <div style={{ fontSize: "1.2rem", color: isDark ? "white" : "black" }}>
        {message}
      </div>
    </div>
  );
}
const VerticalSlider = ({ isDark }) => {
  const [data, setData] = useState([]);
  const back_url = getEnv("BACK_URL");
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
  const invitePeople = async () => {
    try {
      const res = await axios.get(`${back_url}/communities/lightPlate`);
      setData(res.data.result);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    invitePeople();
  }, []);
  const navigate = useNavigate();
  return (
    <div
      className="shadow mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? GlobalColor.colors.primary_black50 : "white",
        borderRadius: "1rem",
        height: "5rem",
      }}
    >
      <Slider {...settings}>
        {data.map((item, index) => (
          <CustomSlide
            id={item.boardId}
            navigate={navigate}
            isDark={isDark}
            key={index}
            projectname={item.projectName}
            message={item.boardTitle}
          />
        ))}
      </Slider>
    </div>
  );
};

export default VerticalSlider;
