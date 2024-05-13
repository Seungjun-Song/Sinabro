import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import UserSkill from "./UserSkill";

const DUMMY_DATA = [
  {
    id: 1,
    skill: "React",
  },
  {
    id: 2,
    skill: "JavaScript",
  },
//   {
//     id: 3,
//     skill: "Vue",
//   },
//   {
//     id: 4,
//     skill: "Css",
//   },
//   {
//     id: 5,
//     skill: "Html",
//   },
  {
    id: 6,
    skill: "Java",
  },
  {
    id: 6,
    skill: "Python",
  },
  {
    id: 6,
    skill: "Spring",
  },
  {
    id: 6,
    skill: "django",
  },
];

const UserSkills = ({whatUser}) => {
  return (
    <motion.div
      className="col-12"
      style={{
        display: "flex",
        height: "100%",
        //   border: "solid 3px black",
        flexWrap: "wrap",
      }}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1, // 순차적으로 애니메이션 적용
            // delay:0.2
          },
        },
        hidden: { opacity: 0 },
      }}
    >
      {whatUser.techStack.map((item, index) => (
        <motion.div
          key={item.id}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          className="col-4"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UserSkill item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default UserSkills;
