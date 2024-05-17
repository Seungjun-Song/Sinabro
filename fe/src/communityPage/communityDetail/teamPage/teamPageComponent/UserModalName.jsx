import { useEffect, useState } from "react";
import "./styles.css";
import { motion } from "framer-motion";
const UserModalName = ({ whatUser,userfind }) => {
  const getColor = (memberJob) => {
    // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
    // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
    return memberJob === "프론트엔드"
      ? "#3DC7AE"
      : memberJob === "백엔드"
      ? "#315DCC"
      : memberJob === "풀스택"
      ? "#6C31CC"
      : "black";
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="col-4"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img style={{ width: "7rem"  ,height:"7rem"}} src={userfind.memberImg}/>
          <div
            className="py-1 mt-2"
            style={{
              backgroundColor: getColor(userfind.memberJob),
              paddingLeft: "2rem",
              paddingRight: "2rem",
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              borderRadius: "3rem",
            }}
          >
            {userfind.memberJob}
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          className="col-8"
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img style={{ width: "2rem" }} src="/images/GitHub.png" />
            <motion.a
              whileHover={{ y: -5, opacity: 1 }}
              href={userfind.memberGit}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                margin: 0,
                fontSize: "1rem",
                color: "black",
                textDecoration: "none",
                opacity: 0.9,
              }}
            >
              {userfind.memberGit}
            </motion.a>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img style={{ width: "2rem" }} src="/images/id.png" />
            <h5 style={{ margin: 0, fontSize: "1rem" }}>{userfind.nickname}</h5>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img style={{ width: "2rem" }} src="/images/@.png" />
            <h5 style={{ margin: 0, fontSize: "1rem" }}>{userfind.memberEmail}</h5>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default UserModalName;
