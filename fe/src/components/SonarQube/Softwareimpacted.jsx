import {
  faArrowUpRightFromSquare,
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const icon_severity = {
  HIGH: {
    icon: faCircleExclamation,
    bgColor: "rgb(255, 245, 251)",
    color: "rgb(146, 49, 83)",
    bordercolor: "rgb(234, 143, 166)",
  },
  MEDIUM: {
    icon: faCircleChevronUp,
    bgColor: "rgb(252, 245, 228)",
    color: "rgb(140, 94, 30)",
    bordercolor: "rgb(250, 220, 121)",
  },
  LOW: {
    icon: faCircleChevronDown,
    bgColor: "rgb(245, 251, 255)",
    color: "rgb(49, 108, 146)",
    bordercolor: "rgb(143, 202, 234)",
  },
};
const software_qualities = {
  SECURITY:
    "Security is the protection of your software from unauthorized access, use, or destruction. ",
  RELIABILITY:
    "Reliability is a measure of how your software is capable of maintaining its level of performance under stated conditions for a stated period of time.",
  MAINTAINABILITY:
    "Maintainability refers to the ease with which you can repair, improve and understand software code.",
};

const Softwareimpacted = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      style={{
        fontSize: "0.7rem",
        border: "2px solid",
        padding: "0.3rem",
        borderRadius: "15rem",
        display: "flex",
        gap: "0.3rem",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: icon_severity[item.severity].color,
        backgroundColor: icon_severity[item.severity].bgColor,
        bordercolor: icon_severity[item.severity].bordercolor,
      }}
    >
      <div>{item.softwareQuality}</div>
      <FontAwesomeIcon size="lg" icon={icon_severity[item.severity].icon} />
      <AnimatePresence>
        {isHover && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 30,
              left: -90,
              height: "auto",
              width: "20rem",
              backgroundColor: "rgb(62, 67, 87)",
              padding: "1rem",
              zIndex: 1,
              color: "white",
              borderRadius: "1rem",
              fontSize: "0.9rem",
            }}
          >
            <div
              style={{ borderBottom: "solid 2px white", paddingBottom: "1rem" }}
            >
              {software_qualities[item.softwareQuality]}
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <a
                style={{ padding: 0, margin: 0, color: "#4B56BB"}}
                href="https://docs.sonarsource.com/sonarqube/10.5/user-guide/clean-code/introduction/"
                target="_blank"
              >
                Learn More
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default Softwareimpacted;
