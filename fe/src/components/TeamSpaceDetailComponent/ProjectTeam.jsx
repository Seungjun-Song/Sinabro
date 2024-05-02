import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import WhatPos from "./WhatPos";
import WhatPosCard from "./WhatPosCard";
import FakeWhatPos from "./FakeWhatPos";

const DUMMY_DATA = [
  {
    id: 1,
    job: "FE",
    state: "Reader",
    name: "Juhun0283",
  },
  {
    id: 2,
    job: "FE",
    state: "Member",
    name: "Juhun0283",
  },
  {
    id: 3,
    job: "BE",
    state: "Member",
    name: "Juhun0283",
  },
  {
    id: 4,
    job: "FULL",
    state: "Member",
    name: "Juhun0283",
  },
];

const ProjectTeam = ({ setWhatUser, isDark }) => {
  const displayedRoles = [];

  return (
    <motion.div
      style={{ display: "flex", gap: "1.5rem", height: "100%" }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {DUMMY_DATA.map((item, index) => {
        if (!displayedRoles.includes(item.job)) {
          displayedRoles.push(item.job); // 역할을 추가합니다.
          return (
            <motion.div
              key={index}
              style={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                height: "100%",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <WhatPos item={item.job} isDark={isDark} />
              <WhatPosCard
                isDark={isDark}
                setWhatUser={setWhatUser}
                item={item.job}
                state={item.state}
                name={item.name}
              />
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={index}
              style={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                height: "100%",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <FakeWhatPos isDark={isDark} />
              <WhatPosCard
                isDark={isDark}
                setWhatUser={setWhatUser}
                item={item.job}
                state={item.state}
                name={item.name}
              />
            </motion.div>
          );
        }
      })}
    </motion.div>
  );
};

export default ProjectTeam;
