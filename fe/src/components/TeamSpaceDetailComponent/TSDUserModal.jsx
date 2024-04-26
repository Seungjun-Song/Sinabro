import { useEffect, useState } from "react";
import "./styles.css";
import { motion } from "framer-motion";
import UserModalName from "./UserModalName";
import UserSkills from "./UserSkills";
const TSDUserModal = ({ setWhatUser, whatUser }) => {
  return (
    <motion.div
      onClick={() => setWhatUser(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        // display: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <motion.div
        className="shadow p-5 "
        layout
        initial={{ opacity: 0, width: "45%", height: "95%" }}
        animate={{ opacity: 1, width: "40%", height: "90%" }}
        exit={{ opacity: 0, width: "40%", height: "90%" }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          //   height: "90%",
          //   width: "40%",
          //   border:"solid 0.3rem #564CAD ",
          backgroundColor: "white",
          borderRadius: "10px",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
            width: "100%",
            borderRadius: "1rem",
            border: "solid 0.1rem #564CAD ",
          }}
        >
          <UserModalName />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            style={{ display: "flex", marginTop: "2rem" }}
          >
            <span style={{ fontWeight: "bold" }}>GRABBERS</span>
            <span style={{ margin: "0 4px" }}>에서</span>
            <span style={{ fontWeight: "bold" }}>박주헌</span>
            <span style={{ margin: "0 4px" }}> </span>
            <span>님이 사용하는 기술입니다!</span>
          </motion.div>
          <div style={{ height: "100%" }}>
            <UserSkills />
          </div>
          <motion.img
            onClick={() => setWhatUser(false)}
            whileHover={{ opacity: 1, scale: 1.05, cursor: "pointer" }}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              width: "1rem",
              opacity: 0.5,
            }}
            src="/images/close_purple.png"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TSDUserModal;
