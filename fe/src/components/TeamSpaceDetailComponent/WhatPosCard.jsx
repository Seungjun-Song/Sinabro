import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const WhatPosCard = ({ item, state, name, setWhatUser, isDark, teamLeader, memberId }) => {

  const userInfo = useSelector(state => state.user)

  console.log('userInfo : ', userInfo, '\n teamLeader : ', teamLeader, '\n memberId : ', memberId)

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
  const getJobColor = (item) => {
    // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
    // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
    return item === "FE"
      ? "#075A19"
      : item === "BE"
        ? "#2447A1"
        : item === "FULL"
          ? "#391c68"
          : "black";
  };
  return (
    <>
      <motion.div
        layout
        onClick={() => setWhatUser({ item: item, name: name, state: state })}
        whileHover={{ cursor: "pointer", y: -7 }}
        className="shadow d-flex gap-3 "
        style={{
          padding: "1rem",
          borderRadius: "0.5rem",
          border: "3px solid",
          width: "12rem",
          justifyContent: "center",
          alignItems: "center",
          borderColor: getColor(item),
          flexDirection: "column",
          height: "100%",
          backgroundColor: isDark ? "#323232" : "white"
        }}
      >
        <img style={{ width: "6rem" }} src="/images/juheon.png" />
        <div style={{ color: getJobColor(item), width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {state}
          {userInfo.currentUser.uid === teamLeader && memberId !== userInfo.currentUser.uid &&
            <span style={{marginRight: '0.2rem'}}>
              X
            </span>
          }
        </div>
        <h5 style={{ margin: 0, color: isDark ? "white" : "black" }}>{name}</h5>
      </motion.div>
    </>
  );
};

export default WhatPosCard;
