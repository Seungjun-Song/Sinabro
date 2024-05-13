import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlobalColor } from "../../services/color";

const LeftError = ({
  item,
  isSelect,
  setIsSelect,
  index,
  isDark,
  isSelected,
  onSelectKey,
}) => {
  const [isHover, setIsHover] = useState(false);

  // 토글 체크 함수, 체크박스 상태를 전환하고 상위 컴포넌트에 변경을 통지
  const toggleCheck = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onSelectKey(item.key); // 상위 컴포넌트의 onSelectKey 함수 호출로 선택 상태 변경
  };

  // 마지막 nth 슬래시 이후의 경로를 반환하는 함수
  function getLastNthPathSeparatorSubstring(path, n) {
    let currentIndex = path.length - 1;
    let count = 0;
    while (currentIndex >= 0) {
      if (path[currentIndex] === "/") {
        count++;
        if (count === n) {
          return path.substring(currentIndex + 1);
        }
      }
      currentIndex--;
    }
    return ""; // nth 슬래시가 없으면 빈 문자열 반환
  }
  let component = getLastNthPathSeparatorSubstring(item.component, 3);

  if (component.length >= 40) {
    component = getLastNthPathSeparatorSubstring(item.component, 2);
  }
  if (component.length >= 40) {
    component = getLastNthPathSeparatorSubstring(item.component, 1);
  }
  return (
    <motion.div>
      <div
        style={{ color: "gray", padding: "1rem 0.5rem", fontSize: "0.9rem" }}
      >
        .../{component}
      </div>
      <motion.div
        whileHover={{
          backgroundColor: isDark ? "#ccd5f893" : "#ccd5f893",
          border: "1px solid transparent",
        }}
        onClick={() => setIsSelect({ id: index, ...item })}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        style={{
          padding: "1rem 1rem",
          cursor: "pointer",
          color: isDark ? "white" : "black",
          backgroundColor:
            index === isSelect.id
              ? isDark
                ? "#ccd5f893"
                : "#ccd5f893"
              : isDark
              ? GlobalColor.colors.primary_black50
              : "#fff",
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
                top: 0,
                left: 0,
                width: "5px",
                backgroundColor: "#7B87D9",
              }}
            />
          )}
        </AnimatePresence>
        <motion.div
          onClick={toggleCheck}
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            size="lg"
            icon={isSelected ? faSquareCheck : faSquare}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LeftError;
