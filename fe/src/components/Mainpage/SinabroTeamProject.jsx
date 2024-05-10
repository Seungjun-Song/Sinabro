import { GlobalColor } from "../../services/color";
import ProjectCard from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
// const DUMMY_DATA = [
//   {
//     id: 1,
//     img: "/images/pjt1.png",
//     projectname: "GRABBERS",
//     startday: "2023.04.12",
//     endday: "2023.05.30",
//     projectinfo:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

//     skills: ["React", "JavaScript", "Vue"],
//   },
//   {
//     id: 2,
//     img: "/images/pjt2.png",
//     projectname: "GRABBERS",
//     startday: "2023.04.12",
//     endday: "2023.05.30",
//     projectinfo:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

//     skills: ["React", "JavaScript", "Vue"],
//   },
//   {
//     id: 3,
//     img: "/images/pjt3.png",
//     projectname: "GRABBERS",
//     startday: "2023.04.12",
//     endday: "2023.05.30",
//     projectinfo:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

//     skills: ["React", "JavaScript", "Vue"],
//   },
//   {
//     id: 4,
//     img: "/images/pjt4.png",
//     projectname: "GRABBERS",
//     startday: "2023.04.12",
//     endday: "2023.05.30",
//     projectinfo:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

//     skills: ["React", "JavaScript", "Vue"],
//   },
//   {
//     id: 5,
//     img: "/images/pjt5.png",
//     projectname: "GRABBERS",
//     startday: "2023.04.12",
//     endday: "2023.05.30",
//     projectinfo:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

//     skills: ["React", "JavaScript", "Vue", "JavaScript", "JavaScript"],
//   },
//   {
//     id: 6,
//     img: "/images/pjt1.png",
//     projectname: "GRABBERS",
//     startday: "2023.04.12",
//     endday: "2023.05.30",
//     projectinfo:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

//     skills: ["React", "JavaScript", "Vue"],
//   },
// ];

const SinabroTeamProject = ({ isDark, setPage, allPage }) => {
  return (
    <>
      {allPage && (
        <div
          style={{
            width: "100%",
            display: "flex",
            marginTop: "3rem",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <h5
              style={{
                color: isDark ? "white" : "#47474782",
                marginBottom: "1rem",
              }}
            >
              이런걸 만들수 있어요!
            </h5>
            <h3
              style={{
                color: isDark ? "white" : GlobalColor.colors.primary_black,
                fontWeight: "bold",
              }}
            >
              시나브로를 통해 완성한 팀프로젝트
            </h3>
          </div>
          <motion.div
            style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="wait">
              {allPage.map((item, index) => (
                <motion.div
                  key={index}
                  className="col-4"
                  style={{ justifyContent: "center", display: "flex" }}
                  initial={{ opacity: 0,y:10 }}
                  animate={{ opacity: 1 ,y:0}}
                  exit={{ opacity: 0,y:10 }}
                  transition={{ duration: 0.5, }} // 각 자식 요소에 대한 0.1초의 지연 시간
                >
                  <ProjectCard isDark={isDark} item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SinabroTeamProject;
