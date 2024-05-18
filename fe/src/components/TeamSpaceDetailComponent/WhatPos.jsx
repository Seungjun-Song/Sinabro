import { faCog, faDesktop, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
const WhatPos = ({ item, isDark }) => {
  const getColor = (item) => {
    // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
    // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
    return item === "FE"
      ? "#3DC7AE"
      : item === "BE"
      ? "#315DCC"
      : item === "FULL"
      ? "#6C31CC"
      : "black";
  };
  const getJob = (item) => {
    // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
    // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
    return item === "FE"
      ? "프론트엔드"
      : item === "BE"
      ? "백엔드"
      : item === "FULL"
      ? "풀스택"
      : "역할 선택";
  };
  let imgsrc = "";
  if (item == "FE") {
    imgsrc = faDesktop;
  } else if (item == "BE") {
    imgsrc = faCog;
  } else if (item == "FULL") {
    imgsrc = faLeaf;
  }
  return (
    <>
      <div
        className="shadow d-flex"
        style={{
          padding: "0.7rem",
          borderRadius: "0.5rem",
          border: "3px solid",
          width: "12rem",
          alignItems: "center",
          textAlign: "center",
          borderColor: getColor(item),
          height: "4rem"
          ,transition:"0.3s",
          backgroundColor : isDark ? "#323232" :"white"
          
        }}
      >
        <FontAwesomeIcon
          icon={imgsrc}
          style={{
            visibility: "visible",
            fontSize: "20px",
            color: getColor(item),
          }}
        />

        <h5
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
            marginBottom: 0,
            margin: "auto",
            color: isDark ? "white" : "black",
            transition:"0.3s"
          }}
        >
          {getJob(item)}
        </h5>
      </div>
    </>
  );
};

export default WhatPos;
