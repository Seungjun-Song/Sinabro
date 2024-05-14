import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Projectexplanation = ({ isDark, myCurrentProject }) => {

  const renderHtml = htmlString => {
    return { __html: htmlString };
  };

  return (
    <>
      <motion.h4
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        style={{ fontWeight: "bold", color: isDark ? "white" : "black", transition: "0.3s", }}
        transition={{ duration: 0.3 }}
      >
        {myCurrentProject?.projectName}
      </motion.h4>
      <motion.h5
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        style={{ lineHeight: "3rem", margin: 0, color: isDark ? "white" : "black", transition: "0.3s" }}
        transition={{ delay: 0.2, duration: 0.3 }}
        dangerouslySetInnerHTML={renderHtml(myCurrentProject?.projectInfo)}
      />
    </>
  );
};

export default Projectexplanation;
