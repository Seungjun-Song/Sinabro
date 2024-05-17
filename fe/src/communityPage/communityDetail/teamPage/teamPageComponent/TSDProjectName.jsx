import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TSDProjectName = ({ isDark, myCurrentProject }) => {

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        style={{
          display: "flex",
          width: "70%",
          justifyContent: "space-between",
          padding: "2rem",
          alignItems: "end",
          borderBottom: "3px solid transparent", // 투명한 테두리 설정
          borderImage: "linear-gradient(to right, #a8c0ff, #3f2b96 )", // 그라데이션 테두리 이미지
          borderImageSlice: "1", // 이미지 슬라이스
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <img
            className="shadow"
            style={{ width: "8rem" }}
            src={myCurrentProject?.projectImg}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem", color: isDark ? 'white' : "black" }}
          >
            <h5 style={{ margin: 0 }}>프로젝트 명</h5>
            <h3 style={{ fontWeight: "bold", margin: 0 }}>{myCurrentProject?.projectName}</h3>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TSDProjectName;
