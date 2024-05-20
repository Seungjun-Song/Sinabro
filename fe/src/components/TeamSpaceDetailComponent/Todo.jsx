const day_list = ["Today", "D+1", "D+2", "D+3", "D+4", "D+5", "D+6", "D+7"];
const DUMMUY_DATA = [
  {
    calenderId: 5,
    memberName: "ymminn",
    subCategoryId: 501,
    calenderStartDt: "2024-05-05",
    calenderEndDt: "2024-05-13",
    calenderName: "1 테스트 일정",
  },
  {
    calenderId: 6,
    memberName: "ymminn",
    subCategoryId: 501,
    calenderStartDt: "2024-05-10",
    calenderEndDt: "2024-05-16",
    calenderName: "2 테스트 일정",
  },
  {
    calenderId: 7,
    memberName: "ymminn",
    subCategoryId: 501,
    calenderStartDt: "2024-05-02",
    calenderEndDt: "2024-05-08",
    calenderName: "3 테스트 일정",
  },
  {
    calenderId: 8,
    memberName: "ymminn",
    subCategoryId: 501,
    calenderStartDt: "2024-05-13",
    calenderEndDt: "2024-05-20",
    calenderName: "4 테스트 일정",
  },
  {
    calenderId: 9,
    memberName: "ymminn",
    subCategoryId: 501,
    calenderStartDt: "2024-05-05",
    calenderEndDt: "2024-05-13",
    calenderName: "5 테스트 일정",
  },
];
const color_list = [
  "#757bc8",
  "#8187dc",
  "#8e94f2",
  "#9fa0ff",
  "#ada7ff",
  "#bbadff",
  "#cbb2fe",
  "#dab6fc",
  "#ddbdfc",
  "#e0c3fc",
];
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
const Todo = ({ isDark, setMilestone, milestone }) => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  console.log(milestone);
  const currentDate = new Date(today);
  const filteredData = milestone.filter((item) => {
    const startDate = new Date(item.milestoneStartDt);
    const endDate = new Date(item.milestoneEndDt);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    console.log(startDate, endDate);
    // enddate가 오늘보다 크거나 같은 항목은 유지하고,
    // startdate가 오늘부터 일주일 후를 넘어가는 항목은 유지하지 않음
    if (endDate <= today || startDate > nextWeek) {
      return false; // 제거
    }

    return true; // 유지
  });
  const dateList = [];
  while (currentDate <= nextWeek) {
    dateList.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  function isDateInRange(date, startDate, endDate) {
    const dateObj = new Date(date);
    const startObj = new Date(startDate);
    const endObj = new Date(endDate);

    dateObj.setHours(0, 0, 0, 0);
    startObj.setHours(0, 0, 0, 0);
    endObj.setHours(0, 0, 0, 0);

    if (dateObj.getTime() === startObj.getTime()) {
      return { where: "start" };
    } else if (dateObj.getTime() === endObj.getTime()) {
      return { where: "end" };
    } else if (dateObj > startObj && dateObj < endObj) {
      return { where: "between" };
    } else {
      return { where: "none" };
    }
  }
  function getColorForCalenderId(calenderId) {
    return color_list[calenderId ** 3 % 11];
  }
  function isDateInRangeList(
    setIsWhat,
    index,
    dateList,
    startDate,
    endDate,
    calenderId,
    memberName,
    calenderName
  ) {
    const color = getColorForCalenderId(calenderId);

    return (
      <>
        {dateList.map((date, index) => {
          const { where } = isDateInRange(date, startDate, endDate, index);
          const [isHover, setIsHover] = useState(false);
          // console.log(istrue)
          if (where == "start") {
            return (
              <motion.div
                // whileHover={{ opacity: 0.8 }}
                key={index}
                style={{
                  width: "14%",
                  height: "1.2rem",
                  display: "flex",
                  position: "relative",
                  // opacity: isHover ? 0.8 :1
                }}
                onHoverStart={() => (setIsHover(true), setIsWhat(index))}
                onHoverEnd={() => (setIsHover(false), setIsWhat(false))}
              >
                <div style={{ width: "50%", height: "100%" }}></div>
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: color,
                    borderRadius: "1rem 0rem 0rem 1rem",
                  }}
                ></div>
                <AnimatePresence>
                  {isHover && (
                    <motion.div
                      transition={{ duration: "0.3" }}
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        top: 30,
                        left: -15,
                        height: "auto",
                        width: "17rem",
                        backgroundColor: "rgb(62, 67, 87)",
                        padding: "1rem",
                        zIndex: 99,
                        color: "white",
                        borderRadius: "1rem",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div>마일스톤 :{memberName}</div>
                      {/* <div>할 일: {calenderName}</div> */}
                      <div>
                        기한 : {startDate} ~ {endDate}{" "}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }
          if (where == "end") {
            return (
              <motion.div
                // whileHover={{ opacity: 0.8 }}
                key={index}
                style={{
                  width: "14%",
                  height: "1.2rem",
                  display: "flex",
                  position: "relative",
                }}
                onHoverStart={() => (setIsHover(true), setIsWhat(index))}
                onHoverEnd={() => (setIsHover(false), setIsWhat(false))}
              >
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: color,
                    borderRadius: "0rem 1rem 1rem 0rem",
                  }}
                ></div>
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                  }}
                ></div>
                <AnimatePresence>
                  {isHover && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        top: 30,
                        left: -15,
                        height: "auto",
                        width: "17rem",
                        backgroundColor: "rgb(62, 67, 87)",
                        padding: "1rem",
                        zIndex: 1,
                        color: "white",
                        borderRadius: "1rem",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div>마일스톤 :{memberName}</div>
                      {/* <div>할 일: {calenderName}</div> */}
                      <div>
                        기한 : {startDate} ~ {endDate}{" "}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }
          if (where == "between") {
            return (
              <motion.div
                // whileHover={{ opacity: 0.9 }}
                key={index}
                style={{
                  width: "14%",
                  height: "1.2rem",
                  display: "flex",
                  position: "relative",
                  backgroundColor: color,
                }}
                onHoverStart={() => (setIsHover(true), setIsWhat(index))}
                onHoverEnd={() => (setIsHover(false), setIsWhat(false))}
              >
                <AnimatePresence>
                  {isHover && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        // zIndex: 99,
                        position: "absolute",
                        top: 30,
                        left: -15,
                        height: "auto",
                        width: "17rem",
                        backgroundColor: "rgb(62, 67, 87)",
                        padding: "1rem",
                        zIndex: 1,
                        color: "white",
                        borderRadius: "1rem",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div>마일스톤 :{memberName}</div>
                      {/* <div>할 일: {calenderName}</div> */}
                      <div>
                        기한 : {startDate} ~ {endDate}{" "}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }
          return (
            <div key={index} style={{ width: "14%", height: "1.2rem" }}>
              {/* {where} */}
            </div>
          );
        })}
      </>
    );
  }
  const [isWhat, setIsWhat] = useState(false);
  return (
    <>
      {filteredData.length !== 0 && (
        <div style={{ width: "100%", height: "100%" }}>
          <div style={{ display: "flex", width: "100%" }}>
            {dateList.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "14%",
                  textAlign: "center",
                  fontWeight: isWhat === index ? "bold" : "",
                  color: isDark ? "white" : "black",
                }}
              >
                {item.toLocaleDateString()}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            {day_list.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "14%",
                  textAlign: "center",
                  fontWeight: isWhat === index ? "bold" : "",
                  color: isDark ? "white" : "black",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div>
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.calenderId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }} // stagger 효과를 부모 요소인 motion.div에 적용
                  style={{ display: "flex", marginTop: "1rem", zIndex: "9" }}
                >
                  {isDateInRangeList(
                    setIsWhat,
                    index,
                    dateList,
                    item.milestoneStartDt,
                    item.milestoneEndDt,
                    item.milestoneId,
                    item.milestoneTitle,
                    item.milestoneContent
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      {filteredData.length === 0 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize:"2rem",
            color: isDark ? "white" :"black"
          }}
        >
          아직 일정이 없습니다
        </div>
      )}
    </>
  );
};
export default Todo;
