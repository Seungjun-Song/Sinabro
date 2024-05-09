import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlobalColor } from "../../services/color";
const LeftError = ({ item, isSelect, setIsSelect, index ,isDark}) => {
  const [isHover, setIsHover] = useState(false);
  const [isCheck, setIsChect] = useState(false);
  function getLastNthPathSeparatorSubstring(path, n) {
    let currentIndex = path.length - 1;
    let count = 0;

    while (currentIndex >= 0) {
      if (path[currentIndex] === "/") {
        count++;
        if (count === n) {
          return path.substring(currentIndex + 1); // Return the substring from currentIndex + 1 to the end
        }
      }
      currentIndex--;
    }

    return ""; // If the nth '/' is not found, return an empty string
  }
  return (
    <motion.div style={{}}>
      <div
        style={{
          color: "gray",
          padding: "1rem 0.5rem",
          fontSize: "0.9rem",
        }}
      >
        {/* {item.component} */}
        .../{getLastNthPathSeparatorSubstring(item.component, 3)}
      </div>
      <motion.div
        whileHover={{
          backgroundColor: isDark?  "#ccd5f893" :  "#ccd5f893",
          border: "1px solid transparent",
        }}
        onClick={() => setIsSelect({ id: index, ...item })}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        style={{
          padding: "1rem 1rem",
          cursor: "pointer",
          color: isDark ? "white" :"black",
          backgroundColor: index === isSelect.id ? isDark?  "#ccd5f893" :  "#ccd5f893" : isDark? GlobalColor.colors.primary_black50 : "#fff",
          transition: "0.3s",
          border:
            index === isSelect.id
              ? "1px solid transparent"
              : "1px solid #ccd5f8",
          position: "relative",
        }}
      >
        {item.message}
        <AnimatePresence>
          {(isHover || index === isSelect.id) && (
            <motion.div
              initial={{ width: 0, opacity: 0, height: 0 }}
              exit={{ width: 0, opacity: 0, height: 0 }}
              animate={{ width: "5px", opacity: 1, height: "100%" }}
              style={{
                position: "absolute",
                top: "0",
                left: 0,
                width: "5px",
                //   height: "100%",
                backgroundColor: "#7B87D9",
              }}
            />
          )}
        </AnimatePresence>
        <motion.div
          onClick={() => setIsChect(!isCheck)}
          style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          {isCheck ? (
            <FontAwesomeIcon size="lg" icon={faSquareCheck} />
          ) : (
            <FontAwesomeIcon size="lg" icon={faSquare} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
export default LeftError;
